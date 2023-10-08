import { currentUserState } from '@/states/currentUserState';
import Link from 'next/link';
import React from 'react'
import { PiBellBold, PiBellFill, PiCameraPlusBold, PiCameraPlusFill, PiHouseBold, PiHouseFill, PiMagnifyingGlassBold, PiMagnifyingGlassFill, PiUserBold, PiUserFill } from "react-icons/pi";
import { useRecoilValue } from 'recoil';

function NavBar({ active }) {
    const currentUser = useRecoilValue(currentUserState);

    return (
        <nav className="bg-gray-200 py-4 w-full h-[56px]">
            <div className="container mx-auto flex items-center justify-around">
                <Link href="/home" className="text-black">
                    {active == 'home' ? (
                        <PiHouseFill size={24}/>
                    ) : (
                        <PiHouseBold size={24} />
                    )}
                </Link>
                <Link href="/search" className="text-black">
                    {active == 'search' ? (
                        <PiMagnifyingGlassFill size={24} />
                    ) : (
                        <PiMagnifyingGlassBold size={24} />
                    )}
                </Link>
                <Link href="/create" className="text-black">
                    {active == 'create' ? (
                        <PiCameraPlusFill size={24} />
                    ) : (
                        <PiCameraPlusBold size={24} />
                    )}
                </Link>
                <Link href="/notification" className="text-black">
                    {active == 'notification' ? (
                        <PiBellFill size={24} />
                    ) : (
                        <PiBellBold size={24} />
                    )}
                </Link>
                {currentUser ? (
                    <Link href={`/users/${currentUser.uid}`} className="text-black">
                        {active == currentUser.uid ? (
                            <PiUserFill size={24} />
                        ) : (
                            <PiUserBold size={24} />
                        )}
                    </Link>
                ) : (
                    <Link href='/users' className="text-black">
                        <PiUserBold size={24} />
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default NavBar