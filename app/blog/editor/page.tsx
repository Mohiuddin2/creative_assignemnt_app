"use client";
import RichTextEditor from "../../components/Blog/BlogEditor";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { ClipLoader } from "react-spinners"; // For loading spinner

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
  const [isModalOpen, setModalOpen] = useState(false); // State to control the modal visibility
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      author: "",
      tags: [],
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true); // Show loading spinner
    
    try {
      const response = await fetch("/api/blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit blog data");
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      // Open the modal after successful submission
      setModalOpen(true);

      // Reset the form to its default state
      form.reset();
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false); // Hide loading spinner
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
            {loading ? <ClipLoader size={20} color="#000" /> : "Submit"}
          </Button>
        </form>
      </Form>

      {/* Modal for successful submission */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-emerald-300 bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out opacity-100">
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transform scale-100 transition-all duration-500 ease-out"
            style={{ transform: isModalOpen ? "scale(1)" : "scale(0.95)", opacity: isModalOpen ? 1 : 0 }}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">Your content is Created. Thank you.</h2>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => setModalOpen(false)}
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
