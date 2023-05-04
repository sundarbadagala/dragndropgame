import { createContext, useState } from "react";

interface IContext {
  count: number
}

const GameContext = createContext({ count:0, setCount:(count: any)=>{} });

function GameProvider({ children }: any) {
  const [count, setCount] = useState(2);
  return <GameContext.Provider value={{ count, setCount }}>
    {children}
  </GameContext.Provider>;
}

export { GameContext, GameProvider };
