import MainContainer from '@/components/mainContainer'
import { currentUserState } from '@/states/currentUserState'
import { signOut } from 'next-auth/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

function username() {
    const currentUser = useRecoilValue(currentUserState)

    return (
        <MainContainer>
            {currentUser && (
                <div className='w-full px-5 py-2'>
                    <div className='flex gap-5 items-center'>
                        <img className='w-[60px] h-[60px] rounded-full' src={currentUser.image} alt={currentUser.name} />
                        <div className='w-full'>
                            <h1 className='mb-3 text-xl font-bold'>{currentUser.name}</h1>
                            <button className='w-full px-5 py-1 text-white bg-cyan-400 rounded-full
                                hover:bg-cyan-500 transition duration-300 ease-in-out'
                            >
                                フォローする
                            </button>
                        </div>
                    </div>
                    <div className='pt-3'>
                        <span className='pr-2 text-sm'>フォロワー</span>
                        <span className='font-semibold text-base'>1000</span>
                    </div>
                    <p className='py-3 text-sm'>
                        お掃除の習慣を身につけたい現役JKです🥺💕 お掃除頑張ります😘 よろしくお願いします🙏
                    </p>

                    <hr className='w-full my-5 mx-auto border-slate-400' />

                    <div className='w-full px-5 py-3 bg-slate-100 rounded-3xl'>
                        <h2 className='pb-3 text-xl font-bold'>
                            お掃除記録
                        </h2>
                        <div className='flex flex-col gap-3 items-center justify-center'>
                            <span className='text-6xl'>🔥</span>
                            <span className='text-2xl font-bold'>3 Day</span>
                        </div>
                    </div>

                    <button className='block px-5 py-2 mx-auto mt-5 rounded-3xl text-base text-white bg-red-500
                        hover:bg-red-600 transition duration-300 ease-in-out'
                        onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                    >
                        ログアウトする
                    </button>
                </div>
            )}
        </MainContainer>
    )
}

export default username