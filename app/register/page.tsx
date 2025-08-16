"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerSchema } from "@/src/lib/validations"
import { register, login, isAuthenticated } from "@/src/lib/auth-client"
import { z } from "zod"
import { useAuthStore } from "@/src/stores/authStore"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const { getRedirectPath } = useAuthStore();
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(getRedirectPath())
    } else {
      router.push('/register')
    }
  }, [router, getRedirectPath])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" })
        return
      }

      const validatedData = registerSchema.parse({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      await register(validatedData.name, validatedData.email, validatedData.password)
      await login(validatedData.email, validatedData.password)
      router.push("/")
      router.refresh()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      } else if (error instanceof Error) {
        setErrors({ general: error.message })
      } else {
        setErrors({ general: "Something went wrong. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-foreground font-bold text-xl">CN</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Join Capture Now</h1>
          <p className="text-muted">Create your account and start capturing ideas</p>
        </div>

        {/* Register Form */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 card-hover">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-muted 
                  focus:outline-none focus:border-border-focus transition-colors
                  ${errors.name ? 'border-error' : 'border-border'}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-error">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-muted 
                  focus:outline-none focus:border-border-focus transition-colors
                  ${errors.email ? 'border-error' : 'border-border'}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-error">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-muted 
                  focus:outline-none focus:border-border-focus transition-colors
                  ${errors.password ? 'border-error' : 'border-border'}`}
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-error">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`w-full px-4 py-3 bg-surface border rounded-lg text-foreground placeholder-muted 
                  focus:outline-none focus:border-border-focus transition-colors
                  ${errors.confirmPassword ? 'border-error' : 'border-border'}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-error">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:opacity-90 text-foreground py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-foreground mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center">
              <p className="text-muted text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-accent hover:text-primary font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-muted text-xs">
            Capture your thoughts, organize your ideas
          </p>
        </div>
      </div>
    </div>
  )
}