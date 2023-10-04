import NavBar from '@/components/navbar'
import React from 'react'

function MainContainer({ children }) {
  return (
    <div className='max-w-[600px] w-[100%] mx-auto bg-gray-50 h-screen flex flex-col justify-between'>
      <div className='bg-gray-200 py-4 flex justify-center h-[56px]'>部屋ぐらむ</div>
      <div className='h-full justify-start flex flex-col'>
        { children }
      </div>
      <NavBar />
    </div>
  )
}

export default MainContainer