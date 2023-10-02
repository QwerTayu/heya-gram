import React, { useEffect } from 'react'
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MainContainer from '@/components/mainContainer';

function home() {
    const [ posts, setPosts ] = React.useState([]);
    useEffect(() => {
        const postData = collection(db, 'posts');
        getDocs(postData).then((snapshot) => {
            setPosts(snapshot.docs.map((doc) => doc.data()));
            onSnapshot(postData, (post) => {
                setPosts(post.docs.map((doc) => doc.data()));
            });
        });
    }, []);
    return (
        <MainContainer>
            {/* コンテンツ */}
            { posts.map((post) => (
                <div key={post.username}>
                    <p>{post.body}</p>
                </div>
            ))}
        </MainContainer>
    )
}

export default home