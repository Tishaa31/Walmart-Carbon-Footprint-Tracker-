// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { User, Shield, Eye, EyeOff } from "lucide-react"

// interface LoginModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onLogin: (userType: "admin" | "customer", userData: any) => void
// }

// export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
//   const [showPassword, setShowPassword] = useState(false)
//   const [customerForm, setCustomerForm] = useState({
//     email: "",
//     password: "",
//   })
//   const [adminForm, setAdminForm] = useState({
//     employeeId: "",
//     password: "",
//   })

//   const handleCustomerLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Mock customer login
//     onLogin("customer", {
//       id: "customer_123",
//       name: "User",
//       email: customerForm.email,
//       type: "customer",
//     })
//     onClose()
//   }

//   const handleAdminLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Mock admin login
//     onLogin("admin", {
//       id: "admin_456",
//       name: "Manager",
//       employeeId: adminForm.employeeId,
//       type: "admin",
//       department: "Sustainability",
//     })
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle className="text-center text-2xl font-bold">Welcome to Walmart</DialogTitle>
//         </DialogHeader>

//         <Tabs defaultValue="customer" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="customer" className="flex items-center space-x-2">
//               <User className="h-4 w-4" />
//               <span>Customer</span>
//             </TabsTrigger>
//             <TabsTrigger value="admin" className="flex items-center space-x-2">
//               <Shield className="h-4 w-4" />
//               <span>Admin</span>
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="customer">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <User className="h-5 w-5 text-blue-600" />
//                   <span>Customer Login</span>
//                 </CardTitle>
//                 <CardDescription>Sign in to your Walmart account to shop and earn GreenPoints</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleCustomerLogin} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="customer-email">Email Address</Label>
//                     <Input
//                       id="customer-email"
//                       type="email"
//                       placeholder="Enter your email"
//                       value={customerForm.email}
//                       onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="customer-password">Password</Label>
//                     <div className="relative">
//                       <Input
//                         id="customer-password"
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Enter your password"
//                         value={customerForm.password}
//                         onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
//                         required
//                       />
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       </Button>
//                     </div>
//                   </div>
//                   <Button type="submit" className="w-full bg-[#0071CE] hover:bg-blue-700">
//                     Sign In
//                   </Button>
//                   <div className="text-center space-y-2">
//                     <Button variant="link" className="text-sm text-blue-600">
//                       Forgot your password?
//                     </Button>
//                     <div className="text-sm text-gray-600">
//                       Don't have an account?{" "}
//                       <Button variant="link" className="p-0 h-auto text-blue-600">
//                         Create one
//                       </Button>
//                     </div>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="admin">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <Shield className="h-5 w-5 text-green-600" />
//                   <span>Admin Login</span>
//                 </CardTitle>
//                 <CardDescription>Access the sustainability management dashboard</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleAdminLogin} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="admin-employee-id">Employee ID</Label>
//                     <Input
//                       id="admin-employee-id"
//                       type="text"
//                       placeholder="Enter your employee ID"
//                       value={adminForm.employeeId}
//                       onChange={(e) => setAdminForm({ ...adminForm, employeeId: e.target.value })}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="admin-password">Password</Label>
//                     <div className="relative">
//                       <Input
//                         id="admin-password"
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Enter your password"
//                         value={adminForm.password}
//                         onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
//                         required
//                       />
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                         onClick={() => setShowPassword(!showPassword)}
//                       >
//                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       </Button>
//                     </div>
//                   </div>
//                   <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
//                     Access Dashboard
//                   </Button>
//                   <div className="text-center">
//                     <Button variant="link" className="text-sm text-green-600">
//                       Need help accessing your account?
//                     </Button>
//                   </div>
//                 </form>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>

//         <div className="text-center text-xs text-gray-500 mt-4">
//           By signing in, you agree to Walmart's Terms of Service and Privacy Policy
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }



"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Shield, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (userType: "admin" | "customer", userData: any) => void
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [customerForm, setCustomerForm] = useState({ email: "", password: "" })
  const [adminForm, setAdminForm] = useState({ employeeId: "", password: "" })

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin("customer", {
      id: "customer_123",
      name: "User",
      email: customerForm.email,
      type: "customer",
    })
    onClose()
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin("admin", {
      id: "admin_456",
      name: "Manager",
      employeeId: adminForm.employeeId,
      type: "admin",
      department: "Sustainability",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-md shadow-lg">
        {/* Header with Walmart logo */}
        <div className="bg-[#0071CE] px-6 py-3 flex justify-start items-center text-white space-x-2">
          <Image src="/walmart-logo-new.png" alt="Walmart Logo" width={22} height={22} />
          <div className="text-lg font-semibold">Walmart</div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#1e1e1e] mt-2">
            Welcome to Walmart
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="customer" className="w-full px-6">
          <TabsList className="grid w-full grid-cols-2 mb-4 mt-2">
            <TabsTrigger value="customer" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Customer</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          {/* Customer Login */}
          <TabsContent value="customer">
            <Card className="bg-white border-none shadow-none rounded-none px-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[18px] text-[#1e1e1e]">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Customer Login</span>
                </CardTitle>
                <CardDescription>
                  Sign in to your Walmart account to shop and earn GreenPoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCustomerLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email Address</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="Enter your email"
                      value={customerForm.email}
                      onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="customer-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={customerForm.password}
                        onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#0071CE] hover:bg-[#005fb8] text-white font-semibold">
                    Sign In
                  </Button>
                  <div className="text-center space-y-2">
                    <Button variant="link" className="text-sm text-blue-600">
                      Forgot your password?
                    </Button>
                    <div className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Button variant="link" className="p-0 h-auto text-blue-600">
                        Create one
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Login */}
          <TabsContent value="admin">
            <Card className="bg-white border-none shadow-none rounded-none px-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[18px] text-[#1e1e1e]">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Admin Login</span>
                </CardTitle>
                <CardDescription>
                  Access the sustainability management dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-employee-id">Employee ID</Label>
                    <Input
                      id="admin-employee-id"
                      type="text"
                      placeholder="Enter your employee ID"
                      value={adminForm.employeeId}
                      onChange={(e) => setAdminForm({ ...adminForm, employeeId: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={adminForm.password}
                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#47A84F] hover:bg-green-700 text-white font-semibold">
                    Access Dashboard
                  </Button>
                  <div className="text-center">
                    <Button variant="link" className="text-sm text-green-600">
                      Need help accessing your account?
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-gray-500 mt-4 px-4 pb-4">
          By signing in, you agree to Walmart's Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  )
}
