import React from 'react'
import Button from '@/elements/button'

function Start({ handleStart }: any) {
    return (
        <div className='wrapper flex-center'>
            <Button onClick={handleStart}>start</Button>
        </div>
    )
}

export default Start
