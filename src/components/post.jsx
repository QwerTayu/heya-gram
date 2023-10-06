import React from 'react'
import { PiBookmarkSimpleBold, PiCalendarCheckBold, PiChatBold, PiDotsThreeVerticalBold, PiHeartBold, PiLockSimpleFill } from 'react-icons/pi';

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

function Post({ userId, pImageURL, pBody, pLikeCnt, pReplyCnt, pBookmarkCnt, pDayCnt, timeStamp, isPrivate }) {
    const formattedTimeStamp = formatTimeStamp(timeStamp);
        
    return (
        <div className='border-b-2 border-gray-300 border-dashed m-[2px]'>
            <div className='flex flex-row justify-between w-full p-2'>
                <div className='flex justify-between'>
                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>
                    <div className='ml-2 font-semibold flex flex-col justify-center'>{userId}</div>
                </div>
                <div className='flex'>
                    {isPrivate ?
                        <div className='flex flex-col justify-center'>
                            <PiLockSimpleFill size={20} />
                        </div>
                        :
                        <></>
                    }
                    <div className='flex flex-col justify-center text-gray-400 px-2'>{formattedTimeStamp}</div>
                    <div className='flex flex-col justify-center'>
                        <PiDotsThreeVerticalBold size={24} />
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full h-[300px] overflow-hidden flex justify-center'>
                    <img src={pImageURL} alt='post' className='h-full w-full object-cover rounded-lg' />
                </div>
                <div className='whitespace-pre-line p-2'>{pBody}</div>
            </div>
            <div className='flex justify-around'>
                <div className='flex justify-between gap-2 py-2'>
                    <PiHeartBold size={24} />
                    <div>{pLikeCnt}</div>
                </div>
                <div className='flex justify-between gap-2 py-2'>
                    <PiChatBold size={24} />
                    <div>{pReplyCnt}</div>
                </div>
                <div className='flex justify-between gap-2 py-2'>
                    <PiBookmarkSimpleBold size={24} />
                    <div>{pBookmarkCnt}</div>
                </div>
                <div className='flex justify-between gap-2 py-2'>
                    <PiCalendarCheckBold size={24} />
                    <div>{pDayCnt}</div>
                </div>
            </div>
        </div>
    )
}

export default Post