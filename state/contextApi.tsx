import { useRandom } from "@/hooks/useRandom";
import { useRandomChars } from "@/hooks/useRandomChars";
import { levelonewords } from "@/utils/words";
import { createContext, useEffect, useState } from "react";
import { getCorrectedOffset } from '@/helpers/helpers'

interface IGameContext {
  count: any;
  setCount: any;
  isModalEnable: any;
  setIsModalEnable: any;
  modalType: any;
  setModalType: any;
  isTimeOut: any;
  setIsTimeOut: any;
  hydrated: any;
  setHydrated: any;
  handleSubmit: any;
  handleDrag: any;
  handleSetDragsTrue: any;
  isDraggable: any;
  atoms: any;
  isSubmitEnabled: any;
  blocks: any
}

const GameContext = createContext<IGameContext | null>(null);

function GameProvider({ children }: any) {

  const randomChars = useRandomChars()
  const [blocks, handleRandom] = useRandom(levelonewords)

  const [hydrated, setHydrated] = useState(false)
  const [count, setCount] = useState(2);
  const [isModalEnable, setIsModalEnable] = useState(false)
  const [modalType, setModalType] = useState('fail')
  const [isTimeOut, setIsTimeOut] = useState(false)
  const [atoms, setAtoms] = useState<any>([])
  const [posX, setPosX] = useState<any>([])
  const [atomsWord, setAtomsWord] = useState<any>([])
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<any>(false)
  const [isDragElse, setIsDragElse] = useState<any>(true)
  const [isDraggable, setIsDraggable] = useState<any>(true)
  const [isDragged, setIsDragged] = useState<any>(true)
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
  const handleSubmit = () => {
    if (blocks === atomsWord.join('')) {
      handleModal('success')
      handleRandom()
      getAtoms()
      setAtomsWord([])
      setIsSubmitEnabled(false)
    } else {
      handleModal('fail')
      getAtoms()
      setIsSubmitEnabled(false)
      setAtomsWord([])
      handleRandom()
    }
  }
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
        handleModal('shock')
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
  const handleModal = (type: any) => {
    setIsModalEnable(true)
    setModalType(type)
  }
  const handleSetDragsTrue = () => {
    setIsDragged(true)
    setIsDragElse(true)
    setIsDraggable(true)
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
  return (
    <GameContext.Provider
      value={{
        count,
        setCount,
        isModalEnable,
        setIsModalEnable,
        modalType,
        setModalType,
        isTimeOut,
        setIsTimeOut,
        hydrated,
        setHydrated,
        handleSubmit,
        handleDrag,
        handleSetDragsTrue,
        isDraggable,
        atoms,
        isSubmitEnabled,
        blocks
      }}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
