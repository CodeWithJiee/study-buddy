'use client'

import { createUser } from '@/app/lib/actions/user'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import toast from 'react-hot-toast'
import { ArrowLeft, Loader2 } from "lucide-react";
import Logo from '@/app/components/Logo';


export default function FormSignup() {
  // Init
  const initialState = {
    success: false,
    payload: null,
    message: null,
    errors: [],
    input: null,
  }

  // Router
  const { push: redirect } = useRouter()

  const [state, handleSubmit, isPending] = useActionState(
    createUser,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      toast.success('User created successfully! Redirecting to login...')
      setTimeout(() => {
        redirect('/login')
      }, 1000)
    }
  }, [state, redirect])

  // Styles reused from Login
  const inputClassName = "p-2 w-full border border-gray-300 rounded-full py-3 px-6 mb-4 text-black";
  const errorClassName = "border-red-500 bg-red-50";

  return (
    // Replaced template with this wrapper div
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      
      <div className="login-container flex flex-col items-center justify-center p-12 w-full max-w-lg bg-[#162660] rounded-2xl text-white">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center w-full mb-10">  
          <div className="relative flex items-center justify-center w-full mb-1">
            <Link href="/" className="absolute left-0">
              <ArrowLeft />
            </Link>
            <Logo />
          </div>
          <div className="font-mono font-bold text-4xl text-center">
            <div className="mb-4"> Register Account</div>
          </div>
        </div>
        
        {/* Form */}
        <div className="w-full"> 
          <form 
            action={handleSubmit} 
            className="login-form font-mono flex flex-col gap-1"
            noValidate
          >
            
            {/* Name Input */}
            {/* <label htmlFor="name" className="ml-2">Name:</label> */}
            <input 
              type="text" 
              name="name"
              placeholder="Your name"
              defaultValue={state?.input?.name}
              className={`${inputClassName} ${
                state?.errors.find((error) => error.field === 'name') ? errorClassName : ''
              }`}
            />
            {state?.errors.find((error) => error.field === 'name') && (
               <p className="text-red-300 text-sm mb-2 ml-4">
                 {state?.errors.find((error) => error.field === 'name')?.message}
               </p>
            )}
            
            {/* Email Input */}
            {/* <label htmlFor="email" className="ml-2">Email:</label> */}
            <input 
              type="email" 
              name="email"
              placeholder="Your email"
              defaultValue={state?.input?.email}
              className={`${inputClassName} ${
                state?.errors.find((error) => error.field === 'email') ? errorClassName : ''
              }`}
            />
             {state?.errors.find((error) => error.field === 'email') && (
               <p className="text-red-300 text-sm mb-2 ml-4">
                 {state?.errors.find((error) => error.field === 'email')?.message}
               </p>
            )}

            {/* Password Input */}
            {/* <label htmlFor="password" className="ml-2">Password:</label> */}
            <input 
              type="password" 
              name="password"
              placeholder="Your password"
              className={`${inputClassName} ${
                state?.errors.find((error) => error.field === 'password') ? errorClassName : ''
              }`}
            />
            {state?.errors.find((error) => error.field === 'password') && (
               <p className="text-red-300 text-sm mb-2 ml-4">
                 {state?.errors.find((error) => error.field === 'password')?.message}
               </p>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-[#4EB2C1] font-bold text-1xl p-2 w-full border border-[#162660] rounded-full py-3 px-6 text-[#162660] mt-4 flex justify-center items-center"
            >
              {isPending && <Loader2 className="animate-spin mr-2 h-5 w-5"/>}
              {isPending ? 'Please wait...' : 'Sign up'}
            </button>

            <Link href="/login" className="text-center mt-3 text-sm hover:underline">
                Already have an account? Login
            </Link>
          
          </form>
        </div>
      </div>
    </div>
  );
}