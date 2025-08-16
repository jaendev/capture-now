"use client"

import { useState } from 'react'
import { useAuthStore } from '@/src/stores/authStore'
import { logout } from '@/src/lib/auth-client'
import Image from 'next/image'
import { LogOut, X } from 'lucide-react'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user } = useAuthStore()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      logout()
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoggingOut(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4">
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Sign Out</h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-surface rounded-lg border border-border">
            <div className="relative">
              <Image
                src={user?.avatar_url || '/default-avatar.png'}
                alt={user?.name || 'User'}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{user?.name || 'User'}</p>
              <p className="text-sm text-muted">{user?.email || 'user@example.com'}</p>
            </div>
          </div>

          {/* Confirmation Message */}
          <p className="text-muted text-center mb-6">
            Are you sure you want to sign out of your account?
          </p>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-foreground bg-surface hover:bg-hover border border-border rounded-lg transition-colors"
              disabled={isLoggingOut}
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}