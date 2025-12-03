import Default from './templates/Default'
import FormChat from '@/app/components/forms/FormChat'

export default function Home() {
  return (

    <Default className="flex flex-col items-center justify-center h-screen overflow-hidden bg-white">
      
  
      <div className="flex flex-col w-full max-w-xl h-full relative">
        
      
        <div className="flex-none pt-8 px-5 text-center bg-white z-10">
          <h1 className="text-5xl font-extrabold text-[#162660] tracking-tight">Hello, Guest!</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Welcome to i-Juander, your Study Buddy!{' '}
            <a className="font-semibold text-[#4EB2C1] hover:text-[#162660] transition-colors duration-200 cursor-pointer" href="/signup">
              Create your free account
            </a>{' '}
            and upload your notes to get instant AI-powered study help.
          </p>
        </div>

        {/** Chat Form */}
        <div className="flex-1 overflow-hidden w-full">
           <FormChat />
        </div>
      
      </div>
    </Default>
  )
}