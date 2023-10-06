import MainContainer from '@/components/mainContainer'
import Post from '@/components/post'
import { useFirestore } from '@/hooks/useFirestore'
import { currentUserState } from '@/states/currentUserState'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

function username() {
    const currentUser = useRecoilValue(currentUserState);
    const { showPosts } = useFirestore();
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const postsData = await showPosts();
            setPosts(postsData);
        };
        fetchData();
    }, []);

    return (
        <MainContainer>
            {currentUser && (
                <div className='w-full py-2'>
                    <div className='flex justify-between px-2'>
                        <div className='flex flex-col'>
                            <div className='flex gap-5 items-center'>
                                <img className='w-[60px] h-[60px] rounded-full' src={currentUser.image} alt={currentUser.name} />
                                <div className='w-full'>
                                    <h1 className='mb-3 text-xl font-bold'>{currentUser.name}</h1>
                                    {false ? (
                                        <button className='block px-5 py-2 mx-auto mt-5 rounded-3xl text-base text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out'
                                            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                                        >
                                            ログアウトする
                                        </button>
                                    ) : (
                                        <>
                                            {true ? (
                                                <button className='w-full px-5 py-1 text-white bg-cyan-400 rounded-full hover:bg-cyan-500 transition duration-300 ease-in-out'>
                                                    フォローする
                                                </button>
                                            ) : (
                                                <button className='w-full px-5 py-1 text-white bg-cyan-400 rounded-full hover:bg-cyan-500 transition duration-300 ease-in-out'>
                                                    フォロー解除
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <div className='pt-3'>
                                    <span className='pr-2 text-sm'>フォロー</span>
                                    <span className='font-semibold text-base'>1000</span>
                                </div>
                                <div className='pt-3'>
                                    <span className='pr-2 text-sm'>フォロワー</span>
                                    <span className='font-semibold text-base'>1000</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex gap-2 py-3 w-full px-2 overflow-x-auto'>
                        <div className='w-[50%] px-5 py-2 bg-slate-100 rounded-3xl'>
                            <h2 className='pb-3 text-md font-bold flex justify-center'>
                                お掃除記録
                            </h2>
                            <div className='flex flex-col gap-2 items-center justify-center'>
                                <span className='text-4xl'>🔥</span>
                                <span className='text-md font-bold'>3 Day</span>
                            </div>
                        </div>
                        <div className='w-[50%] px-5 py-2 bg-slate-100 rounded-3xl'>
                            <h2 className='pb-3 text-md font-bold flex justify-center'>
                                いいね獲得数
                            </h2>
                            <div className='flex flex-col gap-2 items-center justify-center'>
                                <span className='text-4xl'>💕</span>
                                <span className='text-md font-bold'>3 Day</span>
                            </div>
                        </div>
                    </div>
                    <p className='text-sm px-2'>
                        お掃除の習慣を身につけたい現役JKです🥺💕 お掃除頑張ります😘 よろしくお願いします🙏
                    </p>

                    <hr className='w-full mt-5 mx-auto border-slate-400' />

                    {posts
                    .filter((post) => post.username === 'Taro') // TODO userIdに変更すること
                    .sort((a, b) => b.timeStamp - a.timeStamp)
                    .map((post) => (
                        <div key={post.postId} className=''>
                            <Post
                                userId={post.userId}
                                username={post.username}
                                pImageURL={post.imageURL}
                                pBody={post.body}
                                pLikeCnt={post.like_cnt}
                                pReplyCnt={post.reply_cnt}
                                pBookmarkCnt={post.bookmark_cnt}
                                pDayCnt={post.day_cnt}
                                timeStamp={post.createdAt}
                                isPrivate={post.isPrivate}
                            />
                        </div>
                    ))}

                    
                </div>
            )}
        </MainContainer>
    )
}

export default username