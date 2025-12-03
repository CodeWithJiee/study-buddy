'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import { UserRound, Bot, SendHorizontal } from 'lucide-react'
import ReactMarkdown from 'react-markdown'


export default function FormChat() {

  const { messages, sendMessage } = useChat({
    onError: (error) => {
      console.log('error: ', error)
      setError(error.toString())
    },
  })
  const [error, setError] = useState('')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form && input.trim()) {
        form.requestSubmit()
      }
    }
  }

  async function handleChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!input) return
    try {
      setIsLoading(true)
      await sendMessage({ text: input })
      setInput('')
    } catch (error: any) {
      setError(error.toString())
    } finally {
      setIsLoading(false)
    }
  }

  return (
   
    <div className="flex flex-col h-full w-full mx-auto max-w-md">
      
 
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages && messages.map((message) => (
            <div
              key={message.id}
              className="flex gap-3"
            >
              {message.role === 'user' ? (
                <div className="h-10 w-10 aspect-square rounded-full border flex-none flex items-center justify-center bg-gray-300">
                  <UserRound />
                </div>
              ) : (
                <div className="h-10 w-10 aspect-square rounded-full border flex-none flex items-center justify-center bg-gray-300">
                  <img 
                  src="/i-Juander.png" 
                  alt="AI Logo" 
                  className="w-full h-full object-cover" 
                />
                </div>
              )}
              
              <div className="flex flex-col gap-2 max-w-[85%]">
                {message.parts.map((part, i) => (
                    part.type === 'text' ? (
                      <div key={`${message.id}-${i}`} className="bg-gray-200 p-3 rounded-md text-sm prose prose-sm max-w-none">
                        <ReactMarkdown>
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    ) : null
                ))}
              </div>
            </div>
          ))}
          
     
          <div ref={messagesEndRef} />
      </div>

  
      <form
        onSubmit={(e) => handleChat(e)}
        className="flex-none p-4 bg-white border-t z-10"
      >
        {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
        
        <div className="flex items-end gap-2 p-2 border rounded-md bg-gray-50 focus-within:ring-1 ring-blue-500">
          <textarea
            name="message"
            placeholder="What do you want to know?"
           
            className="grow bg-transparent border-none focus:ring-0 focus:outline-none resize-none max-h-32 min-h-[40px]"
            rows={1}
            onKeyDown={handleKeyDown}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          ></textarea>
      
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex-none transition-colors"
          >
            {isLoading ? <span className="text-xs">...</span> : <SendHorizontal size={20}/>}
          </button>
        </div>
      </form>
    </div>
  )
}