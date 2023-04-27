import React from 'react'
import { motion } from 'framer-motion'

function Button({ children, onClick, ...rest }: any) {
    return (
        <motion.button
            className='button'
            onClick={onClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            whileTap={{ scale: 0.5 }}
            whileHover={{ scale: 1.3}}
            {...rest}
        >
            {children}
        </motion.button>
    )
}

export default Button
