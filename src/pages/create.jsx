import FileUploader from '@/components/fileUploader';
import MainContainer from '@/components/mainContainer'
import { useFirestore } from '@/hooks/useFirestore';
import { useStorage } from '@/hooks/useStorage';
import { router } from 'next/router'
import React, { useState } from 'react'

function create() {
    const [ body, setBody ] = useState('');
    const { createPost } = useFirestore();
    const { showImage } = useStorage();
    const [ postId, setPostId ] = useState('postId');
    const [ isFileUploaded, setIsFileUploaded ] = useState(false);

    const handleInputChange = (value) => {
        setBody(value);
    };

    const sendPost = async () => {
        const imageURL = await showImage(postId);
        createPost(postId, body, null, imageURL); // userId, pBody, pCommentTo, pImageURL
        console.log('投稿しました');
        router.push('/home');
    };

    return (
        <MainContainer>
            <div className='flex justify-between'>
                <button type='button' onClick={() => router.back()} className='p-2'>x</button>
                {isFileUploaded ? (
                    <button type='button' onClick={() => sendPost()} className='p-2'>投稿</button>
                ) : (
                    <button type='button' className='p-2 cursor-not-allowed' disabled>投稿</button>
                )}
            </div>
            <FileUploader postId={postId} setIsFileUploaded={setIsFileUploaded}/>
            <input type="text" placeholder="掃除をしよう！" value={body} onChange={(e) => handleInputChange(e.target.value)} />
        </MainContainer>
    )
}

export default create