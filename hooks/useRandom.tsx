import { useEffect, useState } from "react"

export const useRandom = (arr: any) => {
    const [randomWord, setRandomWord] = useState<any>('')
    const [randomNumbers, setRandomNumbers] = useState<any>([])

    const getRandomWord: any = () => {
        if (randomNumbers.length === arr.length) return 0
        const randomNumber = Math.floor(Math.random() * arr.length)
        const word = arr[randomNumber]
        if (word === randomWord) return getRandomWord()
        if (randomNumbers.includes(randomNumber)) return getRandomWord()
        setRandomNumbers((prev: any) => [...prev, randomNumber])
        setRandomWord(word)
    }
    useEffect(() => {
        getRandomWord()
    }, [])
    return [randomWord, getRandomWord]
}