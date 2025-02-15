"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  jobName: z.string().min(2, {
    message: "Job name must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  orderTakenBy: z.string().min(2, {
    message: "Order taken by must be at least 2 characters.",
  }),
  descriptionOfWork: z.string().min(2, {
    message: "Description of work must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  labor: z.string({
    required_error: "Please select a labor option.",
  }),
  travel: z.string({
    required_error: "Please select a travel option.",
  }),
  signature: z.string().min(2, {
    message: "Signature must be at least 2 characters.",
  }),
})

const jobNames = [
  { "label": "1Plumbing", "value": "1plumbing" },
  { "label": "Electrical", "value": "electrical" },
  { "label": "Carpentry", "value": "carpentry" },
  { "label": "Painting", "value": "painting" },
  { "label": "apple", "value": "apple" },
  { "label": "pear", "value": "pear" },
  { "label": "4Carpentry", "value": "4carpentry" },
  { "label": "9Painting", "value": "9painting" },
  { "label": "Plumbing", "value": "plumbing" },
  { "label": "5apple", "value": "5apple" },
  { "label": "8Plumbing", "value": "8plumbing" },
  { "label": "Carpentry", "value": "carpentry" },
  { "label": "7Electrical", "value": "7electrical" },
  { "label": "1apple", "value": "1apple" },
  { "label": "Electrical", "value": "electrical" },
  { "label": "Painting", "value": "painting" },
  { "label": "pear", "value": "pear" },
  { "label": "Carpentry", "value": "carpentry" },
  { "label": "Plumbing", "value": "plumbing" },
  { "label": "3Carpentry", "value": "3carpentry" },
  { "label": "apple", "value": "apple" },
  { "label": "9Electrical", "value": "9electrical" },
  { "label": "pear", "value": "pear" },
  { "label": "7Painting", "value": "7painting" },
  { "label": "8Electrical", "value": "8electrical" },
  { "label": "1Plumbing", "value": "1plumbing" },
  { "label": "4apple", "value": "4apple" },
  { "label": "Carpentry", "value": "carpentry" },
  { "label": "5Painting", "value": "5painting" },
  { "label": "8Carpentry", "value": "8carpentry" },
  { "label": "3Plumbing", "value": "3plumbing" },
  { "label": "1Painting", "value": "1painting" },
  { "label": "Electrical", "value": "electrical" },
  { "label": "Carpentry", "value": "carpentry" },
  { "label": "6Painting", "value": "6painting" },
  { "label": "2pear", "value": "2pear" },
  { "label": "5Plumbing", "value": "5plumbing" },
  { "label": "apple", "value": "apple" },
  { "label": "9Carpentry", "value": "9carpentry" },
  { "label": "4Plumbing", "value": "4plumbing" },
  { "label": "Electrical", "value": "electrical" },
  { "label": "2Carpentry", "value": "2carpentry" },
  { "label": "7Painting", "value": "7painting" },
  { "label": "Carpentry", "value": "carpentry" },
  { "label": "5pear", "value": "5pear" },
  { "label": "9Electrical", "value": "9electrical" },
  { "label": "1Carpentry", "value": "1carpentry" },
  { "label": "Painting", "value": "painting" },
  { "label": "Electrical", "value": "electrical" },
  { "label": "pear", "value": "pear" },
  { "label": "3apple", "value": "3apple" },
  { "label": "6Carpentry", "value": "6carpentry" },
  { "label": "7Plumbing", "value": "7plumbing" },
  { "label": "2Painting", "value": "2painting" },
  { "label": "Carpentry", "value": "carpentry" },
  { "label": "apple", "value": "apple" },
  { "label": "5Electrical", "value": "5electrical" },
  { "label": "1Plumbing", "value": "1plumbing" },
  { "label": "Painting", "value": "painting" },
  { "label": "pear", "value": "pear" },
  { "label": "4Electrical", "value": "4electrical" },
  { "label": "8Painting", "value": "8painting" },
  { "label": "2Carpentry", "value": "2carpentry" },
  { "label": "apple", "value": "apple" },
  { "label": "6Electrical", "value": "6electrical" },
  { "label": "9Carpentry", "value": "9carpentry" },
  { "label": "pear", "value": "pear" },
  { "label": "Carpentry", "value": "carpentry" },
  { "label": "Painting", "value": "painting" },
  { "label": "5apple", "value": "5apple" },
  { "label": "1Electrical", "value": "1electrical" },
  { "label": "3Painting", "value": "3painting" },
  { "label": "2Electrical", "value": "2electrical" },
  { "label": "apple", "value": "apple" },
  { "label": "7apple", "value": "7apple" },
  { "label": "6Plumbing", "value": "6plumbing" },
  { "label": "5Carpentry", "value": "5carpentry" },
  { "label": "9apple", "value": "9apple" },
  { "label": "8Carpentry", "value": "8carpentry" },
  { "label": "3pear", "value": "3pear" },
  { "label": "7Carpentry", "value": "7carpentry" },
  { "label": "Plumbing", "value": "plumbing" },
  { "label": "apple", "value": "apple" },
  { "label": "1Carpentry", "value": "1carpentry" },
  { "label": "8Plumbing", "value": "8plumbing" },
  { "label": "6Painting", "value": "6painting" },
  { "label": "9Plumbing", "value": "9plumbing" },
  { "label": "pear", "value": "pear" },
  { "label": "5Electrical", "value": "5electrical" },
  { "label": "Carpentry", "value": "carpentry" },
]

const employees = [
  { label: "John Doe", value: "john_doe" },
  { label: "Jane Smith", value: "jane_smith" },
  { label: "Mike Johnson", value: "mike_johnson" },
]

const workDescriptions = [
  { label: "Repair", value: "repair" },
  { label: "Installation", value: "installation" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Inspection", value: "inspection" },
]

export function JobForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobName: "",
      date: new Date(),
      orderTakenBy: "",
      descriptionOfWork: "",
      description: "",
      labor: "",
      travel: "",
      signature: "",
    },
  })
  const router = useRouter()

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push('/success')
      })
      .catch((error) => console.error(error));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md mx-auto px-4">
        <FormField
          control={form.control}
          name="jobName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Job Name</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? jobNames.find((job) => job.value === field.value)?.label : "Select job name"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-32px)] sm:w-[350px] p-0">
                  <Command>
                    <CommandInput placeholder="Search job name..." />
                    <CommandList>
                      <CommandEmpty>No job name found.</CommandEmpty>
                      <CommandGroup>
                        {jobNames.map((job) => (
                          <CommandItem
                            value={job.label}
                            key={job.value}
                            onSelect={() => {
                              form.setValue("jobName", job.value)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", job.value === field.value ? "opacity-100" : "opacity-0")}
                            />
                            {job.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-32px)] sm:w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orderTakenBy"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Order Taken By</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? employees.find((employee) => employee.value === field.value)?.label
                        : "Select employee"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-32px)] sm:w-[350px] p-0">
                  <Command>
                    <CommandInput placeholder="Search employee..." />
                    <CommandList>
                      <CommandEmpty>No employee found.</CommandEmpty>
                      <CommandGroup>
                        {employees.map((employee) => (
                          <CommandItem
                            value={employee.label}
                            key={employee.value}
                            onSelect={() => {
                              form.setValue("orderTakenBy", employee.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                employee.value === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {employee.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionOfWork"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Description of Work</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? workDescriptions.find((desc) => desc.value === field.value)?.label
                        : "Select work description"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-32px)] sm:w-[350px] p-0">
                  <Command>
                    <CommandInput placeholder="Search work description..." />
                    <CommandList>
                      <CommandEmpty>No work description found.</CommandEmpty>
                      <CommandGroup>
                        {workDescriptions.map((desc) => (
                          <CommandItem
                            value={desc.label}
                            key={desc.value}
                            onSelect={() => {
                              form.setValue("descriptionOfWork", desc.value)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", desc.value === field.value ? "opacity-100" : "opacity-0")}
                            />
                            {desc.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a detailed description of the work..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="labor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Labor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select labor type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="fixed">Fixed Rate</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="travel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Travel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select travel type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="long_distance">Long Distance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signature</FormLabel>
              <FormControl>
                <Input placeholder="Type your signature" {...field} />
              </FormControl>
              <FormDescription>Please type your full name as a signature.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
