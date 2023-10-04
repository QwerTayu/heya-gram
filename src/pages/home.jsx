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
                <div key={post.postId}>
                    <Post
                        userId={post.username}
                        pImageURL={post.imageURL}
                        pBody={post.body}
                        pLikeCnt={2}
                        timeStamp={post.createdAt}
                    />
                </div>
            ))}
        </MainContainer>
    )
}

export default home