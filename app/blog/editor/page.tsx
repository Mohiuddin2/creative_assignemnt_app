"use client";
import RichTextEditor from "../../components/Blog/BlogEditor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { ClipLoader } from "react-spinners"; // Importing ClipLoader from react-spinners

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

// Function to extract text from HTML
function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }), 
  content: z.string().refine(
    (value) => {
      return extractTextFromHTML(value).trim().length >= 5;
    },
    {
      message: "The text must be at least 5 characters long after trimming",
    }
  ),
  author: z.string().min(3, { message: "Author name must be at least 3 characters" }),
  tags: z.array(z.string()).nonempty({ message: "At least one tag is required" }),
});

export default function Home() {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(formSchema), // ✅ Now validates `title` too
    defaultValues: {
      title: "", // ✅ Ensure title has a default value
      content: "",
      author: "",
      tags: [],
    },
  });

  const onSubmit = async (data) => {
    console.log("Data Submitted:", data);
    setLoading(true); // Show the spinner
  
    try {
      // Perform the POST request to the /api/blog/ endpoint
      const response = await fetch("/api/blog/", {
        method: "POST", // Set the method to POST
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(data), // Stringify the data to send as JSON
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit blog data");
      }
  
      // If response is successful, handle the response (e.g., show a success message)
      const responseData = await response.json();
      console.log("API Response:", responseData);
  
      // Do something with the response (e.g., navigate to another page or show a success message)
    } catch (error) {
      // Handle errors (e.g., network issues or server-side errors)
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false); // Hide the spinner after request completes
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
      
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    {...field}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-100 text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      value={field.value.join(", ")} // Convert array to string
                      onChange={(e) => field.onChange(e.target.value.split(",").map(tag => tag.trim()))} // Convert string to array
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-100 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    {...field}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-100 text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Write an Informative Blog</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 bg-slate-50 text-black">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
