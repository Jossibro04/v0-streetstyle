"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Utensils, Store } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SignupPage() {
  const [userType, setUserType] = useState("customer")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-2 text-gray-600">Join the Streetstyle community today</p>
          </div>

          <Tabs defaultValue="customer" className="w-full" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                <span>Food Reviewer/Customer</span>
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                <span>Business/Restaurant</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customer">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Registration</CardTitle>
                  <CardDescription>
                    Create an account to review your favorite food spots and discover new ones.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input id="customer-email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-password">Password</Label>
                    <Input id="customer-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-red-600 hover:text-red-800">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-red-600 hover:text-red-800">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Create Account</Button>
                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-red-600 hover:text-red-800 font-medium">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle>Business Registration</CardTitle>
                  <CardDescription>
                    Register your restaurant or food business to connect with customers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input id="business-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Input id="business-type" placeholder="Restaurant, Food Truck, etc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-address">Business Address</Label>
                    <Input id="business-address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-phone">Business Phone</Label>
                    <Input id="business-phone" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Business Email</Label>
                    <Input id="business-email" type="email" placeholder="business@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-password">Password</Label>
                    <Input id="business-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-confirm-password">Confirm Password</Label>
                    <Input id="business-confirm-password" type="password" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="business-terms" />
                    <label
                      htmlFor="business-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-red-600 hover:text-red-800">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-red-600 hover:text-red-800">
                        privacy policy
                      </Link>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Register Business</Button>
                  <div className="text-center text-sm text-gray-600">
                    Already have a business account?{" "}
                    <Link href="/login?type=business" className="text-red-600 hover:text-red-800 font-medium">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
