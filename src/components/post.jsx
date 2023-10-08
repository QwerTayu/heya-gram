import { useFirestore } from '@/hooks/useFirestore';
import { currentUserState } from '@/states/currentUserState';
import Link from 'next/link';
import { useMemo, useState } from 'react'
import { PiBookmarkSimpleBold, PiCalendarCheckBold, PiChatBold, PiDotsThreeVerticalBold, PiHeartBold, PiHeartFill, PiLockSimpleFill } from 'react-icons/pi';
import { useRecoilValue } from 'recoil';

function formatTimeStamp(timeStamp) {
    if (!timeStamp) {
        return "N/A"; // タイムスタンプが null または未定義の場合、適切なエラーメッセージまたはデフォルト値を返す
    }

    const date = timeStamp.toDate();
    const japanTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Tokyo" })); // タイムゾーンを日本時間に変更

    const year = japanTime.getFullYear();
    const month = (japanTime.getMonth() + 1).toString().padStart(2, '0');
    const day = japanTime.getDate().toString().padStart(2, '0');
    const hours = japanTime.getHours().toString().padStart(2, '0');
    const minutes = japanTime.getMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

function Post({ postId, userId, username, userIconURL, pImageURL, pBody, postLikedData, pDayCnt, timeStamp, isPrivate }) {
    const formattedTimeStamp = formatTimeStamp(timeStamp);

    const currentUser = useRecoilValue(currentUserState);
    const { updateLikes } = useFirestore();
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikesData, setCurrentLikesData] = useState([]);
    const [likeCounts, setLikeCounts] = useState(0);
    const [isFetched, setIsFetched] = useState(false);

    useMemo(() => {
        if (!isFetched && currentUser && (postLikedData.length > 0)) {
            setCurrentLikesData(postLikedData)
            setLikeCounts(postLikedData.length); // いいねの数を初期化
            const isLikedData = postLikedData.find((like) => like === currentUser.uid) !== null; // いいねしたユーザーの中に、現在のユーザーがいるかどうか
            setIsLiked(isLikedData);
            setIsFetched(true);
        }
    }, [postLikedData]) // 投稿にいいねがあれば、いいねの数をセットする

    const handleLike = async () => {
        currentUser && await updateLikes(currentUser.uid, postId, currentLikesData, setCurrentLikesData, isLiked, setIsLiked, likeCounts, setLikeCounts);
    }

    return (
        <div className='border-b-2 border-gray-300 border-dashed m-[2px] bg-gray-50'>
            <div className='flex flex-row justify-between w-full p-2'>
                <Link href={`/users/${userId}`} className=''>
                    <div className='flex justify-between'>
                            <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
                                <img src={userIconURL} alt="" />
                            </div>
                            <div className='ml-2 font-semibold flex flex-col justify-center' style={{ maxWidth: 'calc(100vw - 80px)' }}>
                                <span className='line-clamp-1'>{username}</span>
                            </div>
                    </div>
                </Link>
                <div className='flex'>
                    {isPrivate ?
                        <div className='flex flex-col justify-center'>
                            <PiLockSimpleFill size={20} />
                        </div>
                        :
                        <></>
                    }
                    <div className='flex flex-col justify-center'>
                        <PiDotsThreeVerticalBold size={24} />
                    </div>
                </div>
            </div>
            <div className='w-full h-[300px] overflow-hidden flex justify-center'>
                <img src={pImageURL} alt='post' className='h-full w-full object-cover rounded-lg' />
            </div>
            <div className='w-full flex justify-between'>
                <div className='flex justify-start gap-3 px-2'>
                    <button
                        className='flex justify-between gap-2 py-2'
                        onClick={() => handleLike()}
                    >
                        <PiHeartFill size={24} className={isLiked ? 'fill-red-500' : 'fill-gray-200'} />
                        <div>{likeCounts}</div>
                    </button>
                    <div className='flex justify-between gap-2 py-2'>
                        <PiCalendarCheckBold size={24} />
                        <div>{pDayCnt}</div>
                    </div>
                </div>
                <div className='text-xs flex flex-col justify-start text-gray-400 px-2'>
                    {formattedTimeStamp}
                </div>
            </div>
            <div className='whitespace-pre-line pb-2 px-2'>{pBody}</div>
        </div>
    )
}

export default Post