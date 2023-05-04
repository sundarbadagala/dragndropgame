import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { GameContext } from '@/state/contextApi'
import { levelsconfig } from '@/utils/levels.config'

export default function Timer({ levelvalue = 'levelone' }: any) {
    const rest = useContext(GameContext)
    const { setIsModalEnable, setModalType } = { ...rest }
    const { time } = levelsconfig[levelvalue]
    const [counter, setCounter] = useState<any>(time)
    const handleCounter = (count?: number) => {
        setCounter(count ? count : (prev: any) => prev - 1)
    }
    useEffect(() => {
        const interval = setInterval(handleCounter, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    useEffect(() => {
        if (counter === 0) {
            setIsModalEnable(true)
            setModalType('timeout')
            handleCounter(time)
        }
    }, [counter])
    return (
        <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
        >
            {counter}
        </motion.h1>
    )
}