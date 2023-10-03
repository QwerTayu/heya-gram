import React from 'react'
import { PiBellBold, PiCameraPlusBold, PiHouseBold, PiMagnifyingGlassBold, PiUserBold } from "react-icons/pi";

function NavBar() {
    return (
        <nav className="bg-gray-200 py-4 w-full h-[56px]">
                <div className="container mx-auto flex items-center justify-around">
                <a href="/home" className="text-black">
                    <PiHouseBold size={24} />
                </a>
                <a href="#" className="text-black">
                    <PiMagnifyingGlassBold size={24} />
                </a>
                <a href="/create" className="text-black">
                    <PiCameraPlusBold size={24} />
                </a>
                <a href="#" className="text-black">
                    <PiBellBold size={24} />
                </a>
                <a href="/username" className="text-black">
                    <PiUserBold size={24} />
                </a>
                </div>
        </nav>
    )
}

export default NavBar