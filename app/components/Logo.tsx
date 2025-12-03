import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="font-mono font-bold text-2xl text-[#4EB2C1]">
      <Link href="/" className="flex items-center gap-3">
        
 
        <Image 
          src="/i-Juander.png" 
          alt="i-Juander"
          width={60}      
          height={60}     
        />

        <span>i-Juander</span>
      </Link>
    </div>
  )
}