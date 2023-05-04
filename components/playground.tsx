import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { levelonewords } from '@/utils/words'
import { useRandom } from '@/hooks/useRandom'
import { useRandomChars } from '@/hooks/useRandomChars'
import {getCorrectedOffset} from '@/utils/helpers'

function Example() {
  const [hydrated, setHydrated] = useState(false)
  const [posX, setPosX] = useState<any>([])
  const [atoms, setAtoms] = useState<any>([])
  const [isDragged, setIsDragged] = useState<any>(true)
  const [atomsWord, setAtomsWord] = useState<any>([])
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<any>(false)
  const [isDragElse, setIsDragElse] = useState<any>(true)
  const [isDraggable, setIsDraggable] = useState<any>(true)

  const randomChars = useRandomChars()
  const [blocks, handleRandom] = useRandom(levelonewords)

  const getLengths = () => {
    const arrlengths = new Array(blocks.length).fill('')
    let x = -100
    let y = 0
    const newArrlengths = arrlengths.map((item: any, index: any) => {
      x += 100
      return { id: index, x: x, y: y }
    })
    setPosX(newArrlengths.map((item: any) => item.x))
  }
  const getAtoms = () => {
    const newChars = `${randomChars}${blocks}`.toUpperCase()
    const allChars = newChars?.split('').map((item: any, index: number) => {
      const positionX = Math.floor((Math.random() * 1000))
      const positionY = Math.floor((Math.random() * 500))
      return {
        id: index,
        char: item,
        isMatch: false,
        posX: positionX,
        posY: positionY
      }
    })
    setAtoms(allChars)
  }

  useEffect(() => {
    getLengths()
    getAtoms()
  }, [blocks])

  useEffect(() => {
    const isValid = atomsWord.includes(undefined)
    if (atomsWord.length !== 0 && !isValid && atomsWord.length === blocks.length) {
      setIsSubmitEnabled(true)
    } else {
      setIsSubmitEnabled(false)
    }
  }, [atomsWord, blocks])

  const handleDrag = (id: any) => {
    const offset = document.getElementById(`${id}`)?.getBoundingClientRect();
    const oX = Math.floor(offset?.left || 0)
    const oY = Math.floor(offset?.top || 0)
    const isPosXValid = posX.some((item: any) => item === oX)
    const findIndex = posX.findIndex((item: any) => item === oX)
    const isPosYValid = 0 === oY || -2 >= oY || 2 >= oY
    const { isMatch } = atoms[id]
    if (isPosXValid && isPosYValid && isDragged && !isMatch) {
      if (atomsWord[findIndex]) {
        const newAtoms = [...atoms]
        const posX = Math.floor(Math.random() * 1000)
        const posY = Math.floor(Math.random() * 500)
        newAtoms[id] = { ...newAtoms[id], posX, posY }
        setAtoms(newAtoms)
        alert('already word is there')
        setIsDragged(false)
      } else {
        const newAtoms = [...atoms]
        newAtoms[id] = { ...newAtoms[id], isMatch: true }
        const el = document.getElementById(`${id}`)?.innerText
        setAtoms(newAtoms)
        setIsDragged(false)
        const newAtomsWord = [...atomsWord]
        newAtomsWord[findIndex] = el
        setAtomsWord(newAtomsWord)
        setIsDraggable(false)
      }
    } else {
      const { isMatch } = atoms[id]
      if ((!isPosXValid || !isPosYValid) && isMatch && isDragElse) {
        const newIndex = getCorrectedOffset(oX)
        const newAtoms = [...atoms]
        newAtoms[id] = { ...newAtoms[id], isMatch: false }
        const newAtomsWord = [...atomsWord]
        newAtomsWord[newIndex] = undefined
        setAtomsWord(newAtomsWord)
        setAtoms(newAtoms)
        setIsDragElse(false)
      }
    }
  };
  const handleSetDragsTrue = () => {
    setIsDragged(true)
    setIsDragElse(true)
    setIsDraggable(true)
  }
  const handleSubmit = () => {
    if (blocks === atomsWord.join('')) {
      alert('success')
      handleRandom()
      getAtoms()
      setAtomsWord([])
      setIsSubmitEnabled(false)
    } else {
      alert('fail')
      getAtoms()
      setIsSubmitEnabled(false)
      setAtomsWord([])
    }
  }

  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    return null
  }
  
  return (
    <div className='wrapper'>
      <div className='blocks'>
        {
          blocks?.split('').map((item: any, index: any) =>
            <motion.div
              key={index}
              className='block flex-center'
              whileHover={{ opacity: 1, cursor: 'pointer' }}
            >
              {item}
            </motion.div>
          )
        }
      </div>
      {isSubmitEnabled && <button className="button btn-submit" onClick={handleSubmit}>Submit</button>}
      <div className='atoms'>
        {
          atoms.map((item: any, index: any) => {
            return (
              <motion.div
                key={index}
                className='atom flex-center'
                style={{ background: `${item.isMatch ? '#83bff7' : '#fff'}`, }}
                initial={{ x: item.posX, y: item.posY }}
                animate={{ x: item.posX, y: item.posY }}
                drag={isDraggable}
                whileHover={{ opacity: 1 }}
                whileTap={{
                  opacity: 1,
                  cursor: "grabbing"
                }}
                transition={{ duration: 0.6 }}
                onDrag={(e) => handleDrag(index)}
                id={`${index}`}
                onDragEnd={() => handleSetDragsTrue()}
              >
                {item.char}
              </motion.div>
            )
          })
        }
      </div>
    </div>
  );
}
export default Example