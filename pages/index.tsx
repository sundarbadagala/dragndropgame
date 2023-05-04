import { useState, useContext } from "react"
import { Roboto } from 'next/font/google'
import Playground from '@/components/playground'
import Start from "@/components/start"

import {GameContext} from '@/state/contextApi'

const roboto = Roboto({
  weight: '900',
  subsets: ['latin'],
})


function Index() {
  const [isEnable, setIsEnable] = useState(false)
  const {count, setCount} = useContext(GameContext)
  const handleStart = () => {
    setIsEnable(true)
  }
  console.log('data', count);
  
  return (
    <main className={`wrapper ${roboto.className}`}>
      <button onClick={()=>setCount(10)}>Click</button>
      {
        isEnable ? <Playground /> : <Start handleStart={handleStart} />
      }
    </main>
  )
}

export default Index
