import Default from './templates/Default'
import FormChat from '@/app/components/forms/FormChat'

export default function Home() {
  return (
    <Default className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
      <div className="flex flex-col gap-12 w-full max-w-xl">
        {/** Welcome message */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">Hello, Guest!</h1>
          <p className="mt-2 text-gray-600">
            Welcome to Study Buddy!{' '}
            <a className="underline text-blue-600 hover:text-blue-800 transition-colors" href="/signup">
              Create your free account
            </a>{' '}
            and upload your notes to get instant AI-powered study help.
          </p>
        </div>

        {/** Chat Form */}
        <FormChat />
      </div>
    </Default>
  )
}
