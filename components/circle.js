// import React from 'react';

// const Circle = ({ score, description }) => {
//   const getColorClass = (score) => {
//     if (score <= 33) {
//       return 'border-red-500';
//     } else if (score <= 67) {
//       return 'border-yellow-500';
//     } else {
//       return 'border-green-500';
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${getColorClass(score)}`}>
//         <div className="text-white text-lg font-bold">{score}</div>
//       </div>
//       <div className="mt-2 text-white text-center">{description}</div>
//     </div>
//   );
// };

// export default Circle;

import React from 'react';

function ProgressCircle({ score, description }) {
  const circumference = (2 * 22 / 7 * 120);
  const getColorClass = (score) => {
        if (score <= 33) {
          return 'text-red-500';
        } else if (score <= 67) {
          return 'text-yellow-500';
        } else {
          return 'text-green-500';
        }
      };

  return (
    <>
    <div className="flex items-center justify-center">
      <svg className="transform -rotate-90 w-72 h-72">
        <circle cx="145" cy="145" r="120" stroke="currentColor" strokeWidth="30" fill="transparent" className="text-gray-700" />
        <circle
          cx="145"
          cy="145"
          r="120"
          stroke="currentColor"
          strokeWidth="30"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (score / 100) * circumference}
          className={`${getColorClass(score)}`}
        />
      </svg>
      <span className="absolute text-5xl">{`${score}%`}</span>
    </div>
    <div className="mt-2 text-white text-center">{description}</div>
    </>
  );
}

export default ProgressCircle;
