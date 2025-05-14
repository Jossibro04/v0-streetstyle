"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const { t } = useLanguage()

  // FAQ categories and questions
  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      questions: [
        {
          id: "what-is-streetstyle",
          question: "What is Streetstyle?",
          answer:
            "Streetstyle is a platform dedicated to connecting food lovers with authentic street food experiences across Trinidad and Tobago. We provide reviews, ratings, and recommendations for the best local food spots.",
        },
        {
          id: "is-streetstyle-free",
          question: "Is Streetstyle free to use?",
          answer:
            "Yes, Streetstyle is completely free for users to browse, search, and read reviews. Creating an account to write reviews and save favorites is also free.",
        },
        {
          id: "coverage-area",
          question: "What areas does Streetstyle cover?",
          answer:
            "Streetstyle currently covers all of Trinidad and Tobago, with a focus on popular food destinations in Port of Spain, San Fernando, Arima, Chaguanas, and Scarborough.",
        },
      ],
    },
    {
      id: "account",
      title: "Account & Profile",
      questions: [
        {
          id: "create-account",
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Sign Up' button in the top right corner of the page. You can sign up using your email address or connect with your social media accounts.",
        },
        {
          id: "delete-account",
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account at any time. Go to your profile settings, scroll to the bottom, and click on 'Delete Account'. Please note that this action is permanent and will remove all your reviews and saved content.",
        },
        {
          id: "change-password",
          question: "How do I change my password?",
          answer:
            "To change your password, go to your profile settings, click on 'Security', and then 'Change Password'. You'll need to enter your current password before setting a new one.",
        },
      ],
    },
    {
      id: "reviews",
      title: "Reviews & Ratings",
      questions: [
        {
          id: "write-review",
          question: "How do I write a review?",
          answer:
            "To write a review, log in to your account and click on the 'Write a Review' button in the navigation menu. You can also find this option on restaurant pages. Follow the steps to rate your experience and share your thoughts.",
        },
        {
          id: "edit-review",
          question: "Can I edit my review after posting?",
          answer:
            "Yes, you can edit your reviews within 30 days of posting. Go to your profile, find the review you want to edit, and click on the 'Edit' button.",
        },
        {
          id: "review-guidelines",
          question: "Are there guidelines for writing reviews?",
          answer:
            "Yes, we have community guidelines for reviews. We ask that all reviews be honest, respectful, and based on personal experience. Reviews should not contain offensive language, promotional content, or personal information about staff or other customers.",
        },
        {
          id: "report-review",
          question: "How do I report an inappropriate review?",
          answer:
            "If you find a review that violates our community guidelines, click on the three dots (...) next to the review and select 'Report'. Our moderation team will review it promptly.",
        },
      ],
    },
    {
      id: "business",
      title: "For Business Owners",
      questions: [
        {
          id: "claim-business",
          question: "How do I claim my business on Streetstyle?",
          answer:
            "To claim your business, create a business account and follow the verification process. Once verified, you'll be able to respond to reviews, update your business information, and access analytics.",
        },
        {
          id: "respond-reviews",
          question: "How can I respond to customer reviews?",
          answer:
            "Once you've claimed your business, you can respond to reviews by going to your business dashboard, finding the review, and clicking 'Respond'. This is a great way to engage with customers and address any concerns.",
        },
        {
          id: "update-business-info",
          question: "How do I update my business information?",
          answer:
            "You can update your business information through your business dashboard. This includes hours of operation, contact details, menu items, and photos. Regular updates help keep your profile accurate and attractive to potential customers.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-red-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl mb-8">Find answers to common questions about Streetstyle</p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="h-12 pl-12 pr-4 py-3 w-full text-gray-900 bg-white border-0 rounded-full shadow-lg focus:ring-2 focus:ring-red-500 text-base"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Category Navigation */}
              <div className="md:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-2">
                      {faqCategories.map((category) => (
                        <a
                          key={category.id}
                          href={`#${category.id}`}
                          className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {category.title}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Accordions */}
              <div className="md:col-span-3 space-y-8">
                {faqCategories.map((category) => (
                  <div key={category.id} id={category.id}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.title}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="bg-white border rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left font-medium text-gray-900">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 py-4 bg-gray-50 text-gray-700">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}

                {/* Still Have Questions */}
                <Card className="mt-8 bg-red-50 border-red-100">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Still Have Questions?</h3>
                      <p className="text-gray-700 mb-4">
                        If you couldn't find the answer to your question, our support team is here to help.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button className="bg-red-600 hover:bg-red-700">
                          <Link href="/help">Contact Support</Link>
                        </Button>
                        <Button variant="outline">
                          <Link href="/help">Submit a Question</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
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
