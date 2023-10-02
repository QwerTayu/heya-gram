import NavBar from '@/pages/components/navbar'
import React from 'react'

function MainContainer({ children }) {
  return (
    <div className='max-w-[600px] w-[100%] mx-auto bg-blue-500 h-screen flex flex-col justify-between'>
      <div className='bg-gray-200 py-4 flex justify-center h-[56px]'>へやグラム</div>
      <div>
        { children }
      </div>
      <NavBar />
    </div>
  )
}

export default MainContainer