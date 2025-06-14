import React from 'react'

const ProgressBar = ({value}:{value:string}) => {
  return (
    <div className="w-full rotate-90 bg-gray-200 rounded-full h-full mb-4 dark:bg-gray-700">
  <div className="bg-blue-600  h-[100px] w-full rounded-full dark:bg-blue-500" style={{width: value||0}}></div>
</div>
  )
}

export default ProgressBar