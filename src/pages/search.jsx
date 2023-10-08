import MainContainer from '@/components/mainContainer'
import { useFirestore } from '@/hooks/useFirestore'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

export default function Search() {
    const { getProfileUserById, getProfileUserByName } = useFirestore();
    const [input, setInput] = useState('');
    const [profileUser, setProfileUser] = useState(null);

    const handleProfileUser = async () => {
        const res = await getProfileUserById(input)
        setProfileUser(res)
    }

    const handleProfileUserByName = async () => {
        const res = await getProfileUserByName(input)
        setProfileUser(res)
    }

    return (
        <MainContainer active='search'>
            <div>
                <h1 className='pl-5 pb-5 text-2xl font-bold'>ユーザー検索</h1>
                <div className='flex items-center justify-center w-full px-3'>
                    <input
                        className='w-[300px] px-5 py-1 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400'
                        type="text" value={input}
                        onChange={(e) => setInput(e.target.value)} />
                    <button
                        className='px-3 py-2 ml-2 text-white bg-cyan-400 rounded-full hover:bg-cyan-500 transition duration-300 ease-in-out'
                        onClick={() => handleProfileUserByName()}
                    >
                        <PiMagnifyingGlassBold size={20} />
                    </button>
                </div>

                {profileUser && (
                    <div className='mt-5 mx-5'>
                        {profileUser && profileUser.map((user) => (
                            <Link href={`/users/${user.uid}`} className='flex items-center gap-3 mb-3'>
                                <img src={user.image} alt={user.name} width={50} height={50} className='rounded-full' />
                                <p>{user.name}</p>
                                <p className='text-sm text-slate-500'>@{user.uid}</p>
                            </Link>
                        ))}
                    </div>
                )}
                {((profileUser === null) || (profileUser?.length === 0)) && (
                    <div
                        className='mt-10'
                    >
                        <p className='text-center'>ユーザーが見つかりません</p>
                    </div>
                )}
            </div>
        </MainContainer>
    )
}