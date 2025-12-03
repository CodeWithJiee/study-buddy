import Link from "next/link";
import Default from "../templates/Default";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  return (
      <Default className="flex flex-col items-center justify-center">
          
          <div className="login-container flex flex-col items-center justify-center p-12 w-lg bg-[#162660] rounded-2xl text-white">
           
            <div className="relative flex items-center justify-center w-full mb-10">  
             <div className="absolute left-0 cursor-pointer"><a href="/"><ArrowLeft/></a></div>
             <div className="font-mono font-bold text-4xl text-center">
                Login Page
             </div>
             
              
            </div>
            
            
            <div className="w-full"> 
              <form className="login-form font-mono flex flex-col gap-1">
                <label htmlFor="email">Email:</label>
                <input 
                  type="text" 
                  className="p-2 w-full border border-gray-300 rounded-full py-3 px-6mb-4 text-black"
                />
                
                <label htmlFor="password">Password:</label>
                <input 
                  type="password" 
                  className="p-2 w-full border border-gray-300 rounded-full py-3 px-6 text-black" 
                />

                <button className="bg-[#4EB2C1] font-bold text-1xl  p-2 w-full border border-[#162660] rounded-full py-3 px-6 text-[#162660] mt-4">
                  Login
                </button>

                <a href="/signup" className="text-center mt-3 text-sm">Don't have an account? Signup</a>
              
              </form>
            </div>
          </div>
        </Default>
  );
}