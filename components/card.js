import React from 'react'

const Card = ({ score, description }) => {
  return (
    <div className='rounded text-center border-[1px] border-gray-500 p-2 w-[150px] max-w-[150px]'>
        <div className='font-bold'>
            {/* {score} */}
        </div>
        <div className="text-gray-400 break-words">
            {description}
        </div>
    </div>
  )
}

export default Card