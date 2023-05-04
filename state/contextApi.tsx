import { createContext, useState } from "react";

interface IContext {
  count: number
}

const GameContext = createContext({
  count: 0,
  setCount: (count: any) => { },
  isModalEnable: false,
  setIsModalEnable: (isModalEnable: any) => { },
  modalType: 'success',
  setModalType: (modalType: any) => { }
});

function GameProvider({ children }: any) {
  const [count, setCount] = useState(2);
  const [isModalEnable, setIsModalEnable] = useState(false)
  const [modalType, setModalType] = useState('fail')
  return (
    <GameContext.Provider
      value={{
        count,
        setCount,
        isModalEnable,
        setIsModalEnable,
        modalType,
        setModalType
      }}>
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
