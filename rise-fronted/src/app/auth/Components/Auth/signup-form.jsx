'use client'
import { cn } from "../../../../../lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link" // Required for client-side navigation links
import { useRouter } from "next/navigation" // For programmatic navigation
import { useSignup } from "../../../../../hooks/auth/signup.js"
import { useAuthStore } from "../../../../../zustand"
import { useState } from "react"

/**
 * SignupForm - Complete signup form with Zustand integration
 * - Uses Zustand for global auth state management
 * - Integrates with useSignup hook for registration
 * - Handles form validation and submission
 */
export function SignupForm({ className, ...props }) {
  const router = useRouter() // Next.js router for navigation
  const { signup } = useSignup()
  const { setAuth, setLoading, setError, isLoading, error, clearError } = useAuthStore()
  
  // Only form data is local state - auth state is in Zustand
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [formErrors, setFormErrors] = useState({})

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    // Clear global error when user starts typing
    if (error) {
      clearError()
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErrors({})
    clearError()

    // Basic validation
    const errors = {}
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required' 
    if (!formData.email.trim()) errors.email = 'Email is required'
    if (!formData.password) errors.password = 'Password is required'
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = 'Passwords do not match'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      // Set loading state in Zustand
      setLoading(true)
      
      // Prepare data for backend (combine first and last name)
      const signupData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }

      const response = await signup(signupData)
      
      // Set auth data in Zustand store
      setAuth(response)
      
      // Handle successful signup
      console.log('Signup successful:', response)
      
      // Redirect to homepage after successful signup
      router.push('/') // Redirects to homepage
      // Alternative routes you can use:
      // router.push('/dashboard') // Redirect to dashboard
      // router.push('/profile')   // Redirect to profile
      // router.push('/welcome')   // Redirect to welcome page
      
    } catch (err) {
      console.error('Signup failed:', err)
      // Set error in Zustand store
      setError(err.message)
    } finally {
      // Clear loading state
      setLoading(false)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Sign up with Google or use your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {/* Display global error from Zustand */}
              {error && (
                <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                  {error}
                </div>
              )}

              {/* Social sign-up buttons */}
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 mr-2">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>

              {/* Divider */}
              <div
                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              {/* Form fields */}
              <div className="grid gap-6">
                {/* First and Last name side-by-side on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      type="text" 
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                    {formErrors.firstName && (
                      <span className="text-red-500 text-xs">{formErrors.firstName}</span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      type="text" 
                      placeholder="Doe" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                    {formErrors.lastName && (
                      <span className="text-red-500 text-xs">{formErrors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                  {formErrors.email && (
                    <span className="text-red-500 text-xs">{formErrors.email}</span>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                  {formErrors.password && (
                    <span className="text-red-500 text-xs">{formErrors.password}</span>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <Input 
                    id="password_confirmation" 
                    name="password_confirmation" 
                    type="password" 
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required 
                  />
                  {formErrors.password_confirmation && (
                    <span className="text-red-500 text-xs">{formErrors.password_confirmation}</span>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </div>

              {/* Short helper / link to login */}
              <div className="text-center text-sm">
                Already have an account? {" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Terms note */}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By creating an account, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
