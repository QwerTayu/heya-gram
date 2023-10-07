import React, { useEffect, useState } from 'react'
import MainContainer from '@/components/mainContainer';
import Post from '@/components/post';
import { useFirestore } from '@/hooks/useFirestore';

function home() {

    const { showPosts, getAllUsers } = useFirestore();
    const [ posts, setPosts ] = useState([]);
    const [ users, setUsers ] = useState([]); // [ { uid: 'uid', name: 'name', image: 'image' }, ...

    useEffect(() => {
        const fetchData = async () => {
            const postsData = await showPosts();
            const usersData = await getAllUsers();
            setPosts(postsData);
            setUsers(usersData);
        };
        fetchData();
    }, []);

    return (
        <MainContainer active='home'>
            {/* コンテンツ */}
            {posts
            .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
            .map((post) => (
                <div key={post.postId} className=''>
                    <Post
                        userId={post.userId}
                        username={post.username}
                        userIconURL={users.find((user) => user.uid === post.userId)?.image}
                        pImageURL={post.imageURL}
                        pBody={post.body}
                        pLikeCnt={post.like_cnt}
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