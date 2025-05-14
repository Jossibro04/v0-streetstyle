"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, FileQuestion, CheckCircle } from "lucide-react"

export default function HelpPage() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [queryType, setQueryType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the form data to your backend
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-red-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
              <p className="text-xl">Get answers to your questions and assistance with any issues</p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* FAQ and Help Categories */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Help Categories</CardTitle>
                    <CardDescription>Browse common topics for quick answers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                        <HelpCircle className="h-5 w-5 text-red-600 mr-3" />
                        <span>General Questions</span>
                      </div>
                      <div className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                        <MessageSquare className="h-5 w-5 text-red-600 mr-3" />
                        <span>Reviews & Ratings</span>
                      </div>
                      <div className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                        <FileQuestion className="h-5 w-5 text-red-600 mr-3" />
                        <span>Account Issues</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-900">+1 (868) 123-4567</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-900">info@streetstyle.com</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Hours</p>
                        <p className="text-gray-900">Monday - Friday: 9AM - 5PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Question</CardTitle>
                    <CardDescription>
                      Fill out the form below and our team will get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className="flex flex-col items-center justify-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600 text-center">
                          Your question has been submitted successfully. We'll get back to you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Your name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Your email address" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="query-type">Query Type</Label>
                          <Select value={queryType} onValueChange={setQueryType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select query type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Question</SelectItem>
                              <SelectItem value="review">Review Issue</SelectItem>
                              <SelectItem value="account">Account Problem</SelectItem>
                              <SelectItem value="suggestion">Suggestion</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="Brief subject of your query" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Please describe your question or issue in detail"
                            rows={6}
                            required
                          />
                        </div>

                        <div className="pt-2">
                          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                            Submit Question
                          </Button>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>

                {/* FAQs */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">How do I write a review?</h3>
                        <p className="text-gray-600">
                          To write a review, log in to your account and click on the "Write a Review" button. You can
                          also find this option in the main navigation menu. Follow the steps to select a restaurant,
                          rate your experience, and share your thoughts.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Can I edit my review after posting?</h3>
                        <p className="text-gray-600">
                          Yes, you can edit your reviews within 30 days of posting. Go to your profile, find the review
                          you want to edit, and click on the "Edit" button.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">How do I claim my business on Streetstyle?</h3>
                        <p className="text-gray-600">
                          To claim your business, create a business account and follow the verification process. Once
                          verified, you'll be able to respond to reviews, update your business information, and access
                          analytics.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All FAQs
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
