import React from 'react'

function MainContainer({ children }) {
  return (
    <div className="w-[600px] mx-auto bg-blue-500 h-screen flex flex-col-reverse">{ children }</div>
  )
}

export default MainContainer