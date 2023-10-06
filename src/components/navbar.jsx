import { currentUserState } from '@/states/currentUserState';
import Link from 'next/link';
import React from 'react'
import { PiBellBold, PiCameraPlusBold, PiHouseBold, PiMagnifyingGlassBold, PiUserBold } from "react-icons/pi";
import { useRecoilValue } from 'recoil';

function NavBar() {
    const currentUser = useRecoilValue(currentUserState);

    return (
        <nav className="bg-gray-200 py-4 w-full h-[56px]">
            <div className="container mx-auto flex items-center justify-around">
                <Link href="/home" className="text-black">
                    <PiHouseBold size={24} />
                </Link>
                <Link href="/search" className="text-black">
                    <PiMagnifyingGlassBold size={24} />
                </Link>
                <Link href="/create" className="text-black">
                    <PiCameraPlusBold size={24} />
                </Link>
                <Link href="#" className="text-black">
                    <PiBellBold size={24} />
                </Link>
                <Link href={currentUser ? `/users/${currentUser.uid}`: '/users'} className="text-black">
                    <PiUserBold size={24} />
                </Link>
            </div>
        </nav>
    )
}

export default NavBar