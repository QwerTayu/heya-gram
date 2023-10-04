import React from 'react'

function formatTimeStamp(timeStamp) {
    const date = timeStamp.toDate();
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

function Post({ userId, pImageURL, pBody, pLikeCnt, timeStamp }) {
    const formattedTimeStamp = formatTimeStamp(timeStamp);
        
    return (
        <div className='w-full'>
            <div className='flex flex-row justify-between w-full'>
                <div>{userId}</div>
                <div>cnt</div>
            </div>
            <div className='w-full'>
                <img src={pImageURL} alt='post' className='w-full' />
                <div>{pBody}</div>
                <div className='flex justify-end text-gray-300'>{formattedTimeStamp}</div>
            </div>
            <div className='flex justify-around'>
                <div>{pLikeCnt}</div>
            </div>
        </div>
    )
}

export default Post