import React, { useEffect, useState } from 'react'
import MainContainer from '@/components/mainContainer';
import Post from '@/components/post';
import { useFirestore } from '@/hooks/useFirestore';

function home() {

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
            {/* コンテンツ */}
            {posts.map((post) => (
                <div key={post.postId} className=''>
                    <Post
                        userId={post.username}
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
        </MainContainer>
    )
}

export default home