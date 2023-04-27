import { useState } from "react"
import { Roboto } from 'next/font/google'
import Playground from '@/components/playground'
import Start from "@/components/start"

const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
})


function Index() {
  const [isEnable, setIsEnable] = useState(false)
  const handleStart = () => {
    setIsEnable(true)
  }
  return (
    <main className={`wrapper ${roboto.className}`}>
      {
        isEnable ? <Playground /> : <Start handleStart={handleStart} />
      }
    </main>
  )
}

export default Index
