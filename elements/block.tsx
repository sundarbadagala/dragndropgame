import React from 'react'

function Block({children}:any) {
  return (
    <div className='block flex-center'>
      {children}
    </div>
  )
}

export default Block
