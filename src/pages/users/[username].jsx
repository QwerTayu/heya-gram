import MainContainer from '@/components/mainContainer'
import Post from '@/components/post'
import { useFirestore } from '@/hooks/useFirestore'
import { currentUserState } from '@/states/currentUserState'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

function username() {
    const currentUser = useRecoilValue(currentUserState)
    const [profileUser, setProfileUser] = useState(null);
    const { getProfileUserById, showPosts, addFollowing, removeFollowing, getFollowing, getFollower} = useFirestore();
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [ followingCnt, setFollowingCnt ] = useState(0);
    const [ followerCnt, setFollowerCnt ] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const postsData = await showPosts();
            setPosts(postsData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (currentUser) {
            const checkFollowerCnt = async () => {
                const followerArray = await getFollower(routerUserId);
                setFollowerCnt(followerArray.length);
            };
            const checkFollowingCnt = async () => {
                const followingArray = await getFollowing(routerUserId);
                setFollowingCnt(followingArray.length);
            }
            checkFollowingCnt();
            checkFollowerCnt();
        }
    }, [currentUser, isFollowing]);

    useEffect(() => {
        if (currentUser && profileUser) {
            
            const checkFollowing = async () => {
                const followingArray = await getFollowing(currentUser.uid);
                setIsFollowing(!followingArray.includes(routerUserId));
            };
            checkFollowing();
        }
    }, [currentUser, profileUser]);

    console.log("Follow:", followingCnt, ", Follower:", followerCnt);

    const router = useRouter();
    const routerUserId = router.query.username;

    useMemo(async () => {
        if (router.isReady && currentUser) {
            if (routerUserId === currentUser.uid) setProfileUser(currentUser);
            else {
                const user = await getProfileUserById(routerUserId);
                setProfileUser(user)
            }
        }
    }, [router, currentUser])


    const handleFollow = async () => {
        if (isFollowing) {
            await removeFollowing(currentUser.uid, routerUserId);
        } else {
            await addFollowing(currentUser.uid, routerUserId);
        }

        // フォロー状態をトグル
        setIsFollowing(!isFollowing);
    };

    return (
        <MainContainer>
            {profileUser && (
                <div className='w-full justify-between py-2'>
                    <div className='flex flex-col px-2'>
                        <div className='flex gap-5 items-center'>
                            <img className='w-[60px] h-[60px] rounded-full' src={profileUser.image} alt={profileUser.name} />
                            <div className='w-full'>
                                <div className='mb-3 flex items-center gap-2'>
                                    <h1 className='text-xl font-bold'>{profileUser.name}</h1>
                                    <p className='text-gray-500'>@{profileUser.uid}</p>
                                </div>
                                {(routerUserId === currentUser.uid) ? (
                                    <button className='px-5 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out'
                                        onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
                                    >
                                        ログアウトする
                                    </button>
                                ) : (
                                    <button onClick={handleFollow} className='px-5 py-1 text-white bg-cyan-400 rounded-full hover:bg-cyan-500 transition duration-300 ease-in-out'>
                                        {isFollowing ? 'フォロー解除' : 'フォローする'}
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className='flex gap-3'>
                            <div className='pt-3'>
                                <span className='pr-2 text-sm'>フォロー</span>
                                <span className='font-semibold text-base'>{followingCnt}</span>
                            </div>
                            <div className='pt-3'>
                                <span className='pr-2 text-sm'>フォロワー</span>
                                <span className='font-semibold text-base'>{followerCnt}</span>
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
                        .filter((post) => post.userId === profileUser.uid) // TODO userIdに変更すること
                        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
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
                        ))
                    }
                </div >
            )}
        </MainContainer >
    )
}

export default username