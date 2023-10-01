import React from 'react'

function MainContainer({ children }) {
  return (
    <div className="mx-auto bg-blue-500 h-screen">{ children }</div>
  )
}

export default MainContainer