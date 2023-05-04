import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { GameContext } from '@/state/contextApi'
import Timer from "./timer";

function Example() {
  const rest = useContext(GameContext)
  const { hydrated, setHydrated, handleSubmit, handleDrag, handleSetDragsTrue, isDraggable, atoms, isSubmitEnabled, blocks } = { ...rest }

  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    return null
  }

  return (
    <div className='wrapper'>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
        <div>
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
        </div>
        <Timer />
      </div>
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