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
                {isFileUploaded && body ? (
                    <button type='button' onClick={() => sendPost()} className='p-2'>
                        <PiPaperPlaneTiltBold size={24} />
                    </button>
                ) : (
                    <button type='button' className='p-2 cursor-not-allowed' disabled>
                        <PiPaperPlaneTiltBold size={24} />
                    </button>
                )}
            </div>
            <div className='flex flex-col justify-between h-full'>  
                <FileUploader postId={postId} setIsFileUploaded={setIsFileUploaded}/>
                <textarea id="message" placeholder="掃除をしよう！" value={body} onChange={(e) => handleInputChange(e.target.value)} rows="4" className="grow block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none overflow-auto"></textarea>
            </div>
        </MainContainer>
    )
}

export default create