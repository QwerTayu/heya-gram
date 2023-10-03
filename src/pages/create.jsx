import FileUploader from '@/components/fileUploader';
import MainContainer from '@/components/mainContainer'
import { useFirestore } from '@/hooks/useFirestore';
import { useStorage } from '@/hooks/useStorage';
import { router } from 'next/router'
import Randomstring from 'randomstring'
import React, { useEffect, useState } from 'react'
import { PiArrowLeftBold, PiPaperPlaneTiltBold } from 'react-icons/pi';

function create() {
    const [ body, setBody ] = useState('');
    const { createPost } = useFirestore();
    const { showImage } = useStorage();
    const [ postId, setPostId ] = useState('postId');
    const [ isFileUploaded, setIsFileUploaded ] = useState(false);

    const randomSlug = Randomstring.generate(16);

    useEffect(() => {
        setPostId(randomSlug);
    }, []);

    const handleInputChange = (value) => {
        setBody(value);
    };

    const sendPost = async () => {
        const imageURL = await showImage(postId);
        createPost(postId, "Taro", body, null, imageURL); // postId, userId, pBody, pCommentTo, pImageURL
        console.log('投稿しました', imageURL);
        router.push('/home');
    };

    return (
        <MainContainer>
            <div className='flex justify-between'>
                <button type='button' onClick={() => router.back()} className='p-2'>
                    <PiArrowLeftBold size={24} />
                </button>
                {isFileUploaded ? (
                    <button type='button' onClick={() => sendPost()} className='p-2'>
                        <PiPaperPlaneTiltBold size={24} />
                    </button>
                ) : (
                    <button type='button' className='p-2 cursor-not-allowed' disabled>
                        <PiPaperPlaneTiltBold size={24} />
                    </button>
                )}
            </div>
            <FileUploader postId={postId} setIsFileUploaded={setIsFileUploaded}/>
            <input type="text" placeholder="掃除をしよう！" value={body} onChange={(e) => handleInputChange(e.target.value)} />
        </MainContainer>
    )
}

export default create