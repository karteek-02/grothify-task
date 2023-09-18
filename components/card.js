import React from 'react';

const Card = ({ score, description }) => {
  const formattedDescription = description.replace(/_/g, ' ');
  const formattedScore = typeof score === 'number' && score % 1 !== 0 ? score.toFixed(2) : score;

  return (
    <div className='rounded text-center border-[1px] border-gray-500 p-2 w-[150px] max-w-[150px]'>
      <div className='font-bold'>{formattedScore}</div>
      <div className="text-gray-400 break-words">
        {formattedDescription}
      </div>
    </div>
  );
};

export default Card;
