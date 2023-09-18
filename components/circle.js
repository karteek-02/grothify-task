import React from 'react'

const CircleComponent = ({ score, description }) => {
    return (
        <div>
            {/* circular progress component with score in bold and xl text and description below that in tailwind*/}
            <div>
                {score} 
            </div> 
            <div>
                {description}
            </div>
        </div>
    )
}

export default CircleComponent