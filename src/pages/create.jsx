import FileUploader from '@/components/fileUploader';
import MainContainer from '@/components/mainContainer'
import { useFirestore } from '@/hooks/useFirestore';
import { useStorage } from '@/hooks/useStorage';
import { currentUserState } from '@/states/currentUserState';
import { router } from 'next/router'
import Randomstring from 'randomstring'
import React, { useEffect, useMemo, useState } from 'react'
import { PiArrowLeftBold, PiPaperPlaneTiltBold } from 'react-icons/pi';
import { useRecoilValue } from 'recoil';

function create() {
    const [body, setBody] = useState('');
    const { createPost } = useFirestore();
    const { showImage, deleteImage } = useStorage();
    const [postId, setPostId] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');

    const randomSlug = Randomstring.generate(16);
    const currnetUser = useRecoilValue(currentUserState);

    useEffect(() => {
        setPostId(randomSlug);
    }, []);

    useMemo(() => {
        if (currnetUser) {
            setUserId(currnetUser.uid);
            setUsername(currnetUser.name);
        }
    }, [currnetUser])

    const handleInputChange = (value) => {
        setBody(value);
    };

    const sendPost = async () => {
        const imageURL = await showImage(postId);
        await createPost(username, postId, userId, body, imageURL, isPrivate); // postId, userId, pBody, pCommentTo, pImageURL
        
        router.push('/home');
    };

    const reversePost = () => {
        deleteImage(postId);
        router.back();
    }

    return (
        <MainContainer active='create'>
            <div className='flex justify-between'>
                <button type='button' onClick={() => reversePost()} className='p-2'>
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
                <FileUploader postId={postId} setIsFileUploaded={setIsFileUploaded} />

                <div className="flex justify-end mb-4">
                    <input id="default-checkbox" type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">プライベートに設定する</label>
                </div>

                <textarea id="message" placeholder="掃除をしよう！" value={body} onChange={(e) => handleInputChange(e.target.value)} rows="4" className="grow block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-auto"></textarea>
            </div>
        </MainContainer>
    )
}

export default create