'use client'

import { useState, useRef, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'

export default function FormLogin() {
  // Refs
  const formRef = useRef<HTMLFormElement>(null)

  // Hooks
  const router = useRouter()
  const { push: redirect } = router

  // Local state
  const [state, setState] = useState({
    message: '',
    success: false,
    errors: {
      email: '',
      password: '',
      system: '',
    },
    input: {
      email: '',
      password: '',
    },
  })
  const [pending, setPending] = useState(false)

  // Handle
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setPending(true)

    // Data
    // ?? undefined or null check like if (!formRef.current) return
    const formData = new FormData(formRef.current ?? undefined)
    const email = formData.get('email')?.toString().trim()
    const password = formData.get('password')?.toString().trim()

    if (!email || !password) {
      setState({
        message: '',
        success: false,
        errors: {
          email: !email ? 'Email is required.' : '',
          password: !password ? 'Password is required.' : '',
          system: '',
        },
        input: {
          email: email ?? '',
          password: password ?? '',
        },
      })
      setPending(false)
      return
    }

    try {
      // NextAuth
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      console.log('RES: ', res)

      if (res?.ok === true) {
        setState({
          message: 'Logged in successfully!',
          success: true,
          errors: {
            email: '',
            password: '',
            system: '',
          },
          input: {
            email: '',
            password: '',
          },
        })

        // Fetch the session to get user role
        const sessionRes = await fetch('/api/auth/session')
        const session = await sessionRes.json()

        console.log('Session: ', session)

        // Do some toast
        toast.success('Logged in successfully! Redirecting...')

        // Wait 1 second before redirecting
        setTimeout(() => {
          //
          redirect(`/`)
        }, 1000)

        //
      } else {
        console.log('Failed to login: ', res)
        setState({
          message: 'Login failed.',
          success: false,
          errors: {
            email: '',
            password: '',
            system: 'Login failed. Please check your credentials.',
          },
          input: {
            email: email ?? '',
            password: password ?? '',
          },
        })
      }

      //
    } catch (error) {
      //
      console.log(error)

      //
      setState({
        message: '',
        success: false,
        errors: {
          email: '',
          password: '',
          system: 'System error, please contact admin.',
        },
        input: {
          email: email ?? '',
          password: password ?? '',
        },
      })
    } finally {
      setPending(false)
    }
  }

  return (

    <div className="login-container flex flex-col items-center justify-center p-12 w-lg bg-[#162660] rounded-2xl">
           
            <div className="relative flex items-center justify-center w-full mb-10">  
             <div className="absolute left-0 cursor-pointer text-white"><a href="/"><ArrowLeft/></a></div>
             <div className="font-mono font-bold text-4xl text-center text-white">
                Login Page
             </div>
             
              
            </div>
    
    <div className="w-full"> 
    <form
      data-loading={pending}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="login-form font-mono flex flex-col gap-1"
    >
    
        <input
          type="email"
          name="email"
          placeholder="Your email"
          defaultValue={state?.input?.email}
          className={`p-2 w-full border border-gray-300 rounded-full py-3 px-6 mb-3 text-black${
            state?.errors.email ? 'border-red-500! bg-red-50!' : ''
          }`}
        />
        {state?.errors.email && (
          <p className="form-error">{state?.errors.email}</p>
        )}
  
    
        <input
          type="password"
          name="password"
          placeholder="Your password"
          defaultValue={state?.input?.password}
          className={`p-2 w-full border border-gray-300 rounded-full py-3 px-6 text-black${
            state?.errors.password ? 'border-red-500! bg-red-50!' : ''
          }`}
        />
        {state?.errors.password && (
          <p className="form-error">{state?.errors.password}</p>
        )}
     
      {/** System error */}
      {state?.errors?.system && (
        <p className="alert alert--error">{state?.errors?.system}</p>
      )}

    
         <button className="bg-[#4EB2C1] font-bold text-1xl  p-2 w-full border border-[#162660] rounded-full py-3 px-6 text-[#162660] mt-4">
          {pending ? 'Please wait...' : 'Log in'}
        </button>
        <div className="flex text-center justify-center mt-2">
        <a href="/signup" className="text-white">Don't have an account? Sign up</a>
        </div>
      
    </form>
    </div>
    </div>
    
  )
}