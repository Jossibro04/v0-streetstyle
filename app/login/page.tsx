"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Utensils, Store } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [userType, setUserType] = useState("customer")

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">Sign in to your Streetstyle account</p>
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
                  <CardTitle>Customer Login</CardTitle>
                  <CardDescription>Sign in to review your favorite food spots and discover new ones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input id="customer-email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="customer-password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-800">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="customer-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Sign In</Button>
                  <div className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-red-600 hover:text-red-800 font-medium">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle>Business Login</CardTitle>
                  <CardDescription>
                    Sign in to manage your restaurant profile and respond to customer reviews.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-email">Business Email</Label>
                    <Input id="business-email" type="email" placeholder="business@example.com" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="business-password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-800">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="business-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Sign In</Button>
                  <div className="text-center text-sm text-gray-600">
                    Don't have a business account?{" "}
                    <Link href="/signup?type=business" className="text-red-600 hover:text-red-800 font-medium">
                      Register your business
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
