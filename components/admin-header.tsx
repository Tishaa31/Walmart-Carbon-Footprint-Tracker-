"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, LogOut } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface AdminHeaderProps {
  user?: any
  onLogout?: () => void
}

export function AdminHeader({ user, onLogout }: AdminHeaderProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-blue-600 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Logo and Title */}
          <div className="flex items-center space-x-4">
            <Image src="/walmart-logo-new.png" alt="Walmart" width={40} height={40} className="h-10 w-10" priority />
            <div>
              <h1 className="text-xl font-bold text-white">Sustainability Management</h1>
              <p className="text-sm text-white">Admin Dashboard</p>
            </div>
          </div>

          {/* Center - Admin Badge */}
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800 border-green-300 px-3 py-1">
              <Shield className="h-7 w-7 mr-4" />
              Administrator Access
            </Badge>
          </div>

          {/* Right section - User Info */}
          <div className="flex items-center space-x-4">
            <div className="relative" ref={userDropdownRef}>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-blue-700 text-white transition-transform duration-200 hover:scale-105"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{user?.name || "Admin User"}</div>
                  <div className="text-xs text-white">{user?.department || "Sustainability"}</div>
                </div>
              </Button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">{user?.name || "Admin User"}</div>
                        <div className="text-sm text-gray-600">Employee ID: {user?.employeeId || "EMP001"}</div>
                        <div className="text-xs text-gray-500">{user?.department || "Sustainability Department"}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 rounded-md transition-colors duration-150">
                      Admin Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-md transition-colors duration-150">
                      System Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-md transition-colors duration-150">
                      Reports & Analytics
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-md transition-colors duration-150">
                      User Management
                    </button>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 rounded-md transition-colors duration-150 text-red-600 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
