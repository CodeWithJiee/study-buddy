import Default from './templates/Default'
import FormChat from '@/app/components/forms/FormChat'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/authOptions'
import { getFilesByUser } from '@/app/lib/actions/file'
import Files from '@/app/components/Files'
import Link from 'next/link'

export default async function Home() {
  // 1. Server-side Logic (Session & Files)
  const session = (await getServerSession(authOptions)) ?? null

  let files: any = []
  if (session && session.user) {
    const resFiles = await getFilesByUser(session.user.id)
    files = resFiles?.success ? resFiles.payload : []
  }

  return (
    <Default className="flex flex-col items-center justify-center h-screen overflow-hidden bg-white">
      <div className="flex flex-col w-full max-w-xl h-full relative">
        
        {/* Header Section */}
        <div className="flex-none pt-2 px-5 text-center bg-white z-10">
          
          {session && session.user ? (
            /* --- AUTHENTICATED STATE --- */
            <>
              <h1 className="text-5xl font-extrabold text-[#162660] tracking-tight">
                Hello, <span className="capitalize">{session.user.name}!</span>
              </h1>
              
              {files.length === 0 && (
                <p className="mt-4 text-base text-gray-600 max-w-xl mx-auto">
                  Upload your first PDF to let Study Buddy start helping you study smarter!
                </p>
              )}
            </>
          ) : (
            /* --- GUEST STATE --- */
            <>
              <h1 className="text-5xl font-extrabold text-[#162660] tracking-tight">
                Hello, Guest!
              </h1>
              <p className="mt-4 text-base text-gray-600 max-w-xl mx-auto">
                Welcome to i-Juander, your Study Buddy!{' '}
                <Link 
                  href="/signup" 
                  className="font-semibold text-[#4EB2C1] hover:text-[#162660] transition-colors duration-200 cursor-pointer"
                >
                  Create your free account
                </Link>{' '}
                and upload your notes to get instant AI-powered study help.
              </p>
            </>
          )}
        </div>

        {/* File List (Only shows if logged in and files exist) */}
        {session && session.user && files.length > 0 && (
           <div className="px-5 py-2">
             <Files files={files} />
           </div>
        )}

        {/* Chat Form */}
        <div className="flex-1 overflow-hidden w-full">
          <FormChat />
        </div>

      </div>
    </Default>
  )
}