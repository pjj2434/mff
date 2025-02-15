import { google } from "googleapis";
import dotenv from 'dotenv';
dotenv.config();

export async function POST(request: Request) {
  const formData = await request.json();

  try {
    const auth = await google.auth.getClient({
      projectId: process.env.PROJECT_ID,
      credentials: {
        type: "service_account",
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        token_url: process.env.TOKEN_URI,
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    // ... (rest of your code remains the same)


    // Initialize the Google Sheets API client
    const sheets = google.sheets({ version: "v4", auth });

    // Configuration for the spreadsheet data retrieval
    const spreadsheetConfig = {
      spreadsheetId: "1AG6U73-GGPtl_tSGcx8Xj4pcMM3U5BPCSYb67wAJWLQ",
      range: "Sheet1!A:H", // Adjust based on your sheet name and columns
    };

    // Append data to the spreadsheet
    const appendData = await sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetConfig.spreadsheetId,
        range: spreadsheetConfig.range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        includeValuesInResponse: true,
        requestBody: {
          values: [
            [
              formData.jobName,
              formData.date,
              formData.orderTakenBy,
              formData.descriptionOfWork,
              formData.description,
              formData.labor,
              formData.travel,
              formData.signature,
            ],
          ],
        },
      });
      
    return new Response(
      JSON.stringify({ message: "Data inserted successfully" }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return new Response(JSON.stringify({ error: "Failed to insert data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
