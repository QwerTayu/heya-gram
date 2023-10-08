import MainContainer from '@/components/mainContainer'
import Modal from '@/components/modal'
import Post from '@/components/post'
import { useFirestore } from '@/hooks/useFirestore'
import { currentUserState } from '@/states/currentUserState'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

function username() {
    const currentUser = useRecoilValue(currentUserState)
    const [profileUser, setProfileUser] = useState(null);
    const { getProfileUserById, showPosts, getAllUsers, addFollowing, removeFollowing, getFollowing, getFollower } = useFirestore();
    const [posts, setPosts] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ isTabPost, setIsTabPost ] = useState(true);
    const [ isFollowing, setIsFollowing ] = useState(false);
    const [ followingCnt, setFollowingCnt ] = useState(0);
    const [ followerCnt, setFollowerCnt ] = useState(0);
    const [ isFollowingModalOpen, setIsFollowingModalOpen ] = useState(false);
    const [ isFollowerModalOpen, setIsFollowerModalOpen ] = useState(false);
    const [ followingIds, setFollowingIds ] = useState([]);
    const [ followerIds, setFollowerIds ] = useState([]);
    const [ followingList, setFollowingList ] = useState([]);
    const [ followerList, setFollowerList ] = useState([]);
    const router = useRouter();
    const routerUserId = router.query.username;

    useEffect(() => {
        const fetchData = async () => {
            const postsData = await showPosts();
            const usersData = await getAllUsers();
            setPosts(postsData);
            setUsers(usersData);
        };
        fetchData();
    }, []);

    // Following, Followerのリストを表示する
    useEffect(() => {
        const fetchData = async () => {
            const newFollowerList = [];
            const newFollowingList = [];
    
            for (const followerId of followerIds) {
                const res = await getProfileUserById(followerId);
                newFollowerList.push(res);
            }
    
            for (const followingId of followingIds) {
                const res = await getProfileUserById(followingId);
                newFollowingList.push(res);
            }
    
            setFollowerList(newFollowerList);
            setFollowingList(newFollowingList);
        };
    
        fetchData();
    }, [isFollowingModalOpen, isFollowerModalOpen, profileUser]); 

    useEffect(() => {
        if (currentUser && profileUser) {
            const checkFF = async () => {
                const followerArray = await getFollower(profileUser.uid);
                setFollowerCnt(followerArray.length);
                setFollowerIds(followerArray.map(item => item.userId));
                const followingArray = await getFollowing(profileUser.uid);
                setFollowingCnt(followingArray.length);
                setFollowingIds(followingArray.map(item => item.userId));
            };
            checkFF();
        }
    }, [ isFollowing, profileUser]);

    useEffect(() => {
        if (profileUser) {
            const checkFollower = async () => {
                const followerArray = await getFollower(profileUser.uid);
                const followerIds = followerArray.map(item => item.userId);
                const isCurrentUserFollowing = followerIds.includes(currentUser.uid);
                setIsFollowing(isCurrentUserFollowing);
            };
            checkFollower();
        }
    }, [profileUser]);

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
            await removeFollowing(currentUser.uid, profileUser.uid);
        } else {
            await addFollowing(currentUser.uid, profileUser.uid);
        }

        // フォロー状態をトグル
        setIsFollowing(!isFollowing);
    };

    return (
        <MainContainer active={profileUser ? profileUser.uid : 'user'}>
            {profileUser && (
                <div className='w-full justify-between py-2'>
                    <div className='flex flex-col px-2'>
                        <div className='flex gap-5 items-center'>
                            <img className='w-[60px] h-[60px] rounded-full' src={profileUser.image} alt={profileUser.name} />
                            <div className='w-full'>
                                <div className='mb-3 flex items-center gap-2'>
                                    <h1 className='text-xl font-bold'><span className='line-clamp-1'>{profileUser.name}</span></h1>
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
                            <div className='pt-3' onClick={() => setIsFollowingModalOpen(true)}>
                                <span className='pr-2 text-sm'>フォロー</span>
                                <span className='font-semibold text-base'>{followingCnt}</span>
                            </div>
                            <div className='pt-3' onClick={() => setIsFollowerModalOpen(true)}>
                                <span className='pr-2 text-sm'>フォロワー</span>
                                <span className='font-semibold text-base'>{followerCnt}</span>
                            </div>
                        </div>
                        <Modal open={isFollowingModalOpen} onClose={() => setIsFollowingModalOpen(false)} title='Following' > {/* Following */}
                            {followingList && (
                                <div className='mt-3 mx-3'>
                                    {followingList && followingList.map((user) => (
                                        <Link key={user.uid} href={`/users/${user.uid}`} className='flex items-center gap-3 mb-3' onClick={() => setIsFollowingModalOpen(false)} >
                                            <img src={user.image} alt={user.name} width={50} height={50} className='rounded-full' />
                                            <div className='flex flex-col justify-space'>
                                                <p className='text-md'>{user.name}</p>
                                                <p className='text-sm text-slate-500'>@{user.uid}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </Modal>
                        <Modal open={isFollowerModalOpen} onClose={() => setIsFollowerModalOpen(false)} title='Follower' > {/* Follower */}
                            {followerList && (
                                <div className='mt-3 mx-3'>
                                    {followerList && followerList.map((user) => (
                                        <Link key={user.uid} href={`/users/${user.uid}`} className='flex items-center gap-3 mb-3' onClick={() => setIsFollowerModalOpen(false)} >
                                            <img src={user.image} alt={user.name} width={50} height={50} className='rounded-full' />
                                            <div className='flex flex-col justify-space'>
                                                <p className='text-md'>{user.name}</p>
                                                <p className='text-sm text-slate-500'>@{user.uid}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </Modal>
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
                                <span className='text-md font-bold'>3 Link</span>
                            </div>

                        </div>
                    </div>
                    <p className='text-sm px-2'>
                        お掃除の習慣を身につけたい現役JKです🥺💕 お掃除頑張ります😘 よろしくお願いします🙏
                    </p>
                    
                    <div className="m-4 border-b border-gray-200">
                        <ul className="flex -mb-px text-sm font-medium text-center">
                            <li className="w-[50%] mr-2">
                                {isTabPost ? (
                                    <button className="w-full inline-block p-2 border-b-2 border-gray-300 rounded-t-lg">Post</button>
                                ) : (
                                    <button className="w-full inline-block p-2 border-b-2 border-transparent rounded-t-lg" onClick={() => setIsTabPost(!isTabPost)}>Post</button>
                                )}
                            </li>
                            <li className="w-[50%] mr-2">
                                {!isTabPost ? (
                                    <button className="w-full inline-block p-2 border-b-2 border-gray-300 rounded-t-lg">Like</button>
                                ) : (
                                    <button className="w-full inline-block p-2 border-b-2 border-transparent rounded-t-lg" onClick={() => setIsTabPost(!isTabPost)}>Like</button>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div id="myTabContent">
                        { isTabPost ? (
                            <>
                                {posts
                                    .filter((post) => post.userId === profileUser.uid)
                                    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                                    .map((post) => (
                                        <div key={post.postId} className=''>
                                            <Post
                                                postId={post.postId}
                                                userId={post.userId}
                                                username={post.username}
                                                userIconURL={users.find((user) => user.uid === post.userId)?.image}
                                                pImageURL={post.imageURL}
                                                pBody={post.body}
                                                postLikedData={post.liked ? post.liked : []}
                                                pDayCnt={post.day_cnt}
                                                timeStamp={post.createdAt}
                                                isPrivate={post.isPrivate}
                                            />
                                        </div>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                {posts
                                    .filter((post) => post.liked?.find((like) => like === profileUser.uid))
                                    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                                    .map((post) => (
                                        <div key={post.postId} className=''>
                                            <Post
                                                postId={post.postId}
                                                userId={post.userId}
                                                username={post.username}
                                                userIconURL={users.find((user) => user.uid === post.userId)?.image}
                                                pImageURL={post.imageURL}
                                                pBody={post.body}
                                                postLikedData={post.liked ? post.liked : []}
                                                pDayCnt={post.day_cnt}
                                                timeStamp={post.createdAt}
                                                isPrivate={post.isPrivate}
                                            />
                                        </div>
                                    ))
                                }
                            </>
                        )}
                    </div>


                    
                </div >
            )}
        </MainContainer >
    )
}

export default username