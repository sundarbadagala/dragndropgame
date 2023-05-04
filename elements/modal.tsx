import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { easeIn, motion, AnimatePresence } from 'framer-motion'
import { GameContext } from '@/state/contextApi'
import getModalType from '@/utils/getModalType'

export default function Modal() {
    const { isModalEnable, setIsModalEnable, modalType, setModalType } = useContext(GameContext)
    useEffect(() => {
        if (isModalEnable) {
            setTimeout(() => {
                setIsModalEnable(false)
            }, 1000)
        }
    }, [isModalEnable])
    const { message, emoji } = getModalType(modalType)
    return (
        <AnimatePresence>
            {
                isModalEnable &&
                <div className='modal-wrapper'>
                    <motion.div
                        className='modal-container'
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ ease: easeIn }}
                    >
                        <motion.div
                            className='modal-icon'
                        >
                            <Image src={emoji} alt='emoji' className='modal-emoji' />
                        </motion.div>
                        <motion.div 
                            className='modal-message'
                        >
                            {message}
                        </motion.div>
                    </motion.div>
                </div>

            }
        </AnimatePresence>
    )

}

