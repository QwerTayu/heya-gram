import React from 'react'

function NavBar() {
    return (
        <nav className="bg-gray-200 py-4 w-full h-[56px]">
                <div className="container mx-auto flex items-center justify-around">
                <a href="/home" className="text-black">家</a>
                <a href="#" className="text-black">探</a>
                <a href="/create" className="text-black">作</a>
                <a href="#" className="text-black">知</a>
                <a href="/username" className="text-black">自</a>
                </div>
        </nav>
    )
}

export default NavBar