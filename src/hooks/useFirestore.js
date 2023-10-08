import { db } from "@/lib/firebase";
import { FieldValue, doc, serverTimestamp, setDoc, getDocs, collection, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

export const useFirestore = () => {
    const createPost = async (username, postId, userId, pBody, pImageURL, isPrivate) => {
        const pRef = doc(db, "posts", postId)
        try {
            await setDoc(pRef, {
                postId: postId,
                body: pBody,
                username: username,
                userId: userId,
                createdAt: serverTimestamp(FieldValue),
                imageURL: pImageURL,
                like_cnt: 0,
                day_cnt: 0,
                isPrivate: isPrivate,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const showPosts = async () => {
        const snapShot = await getDocs(collection(db, "posts"));
        return snapShot.docs.map((doc) => ({ ...doc.data() }));
    };

    const getProfileUserById = async (userId) => {
        const snapShot = await getDoc(doc(db, "users", userId));
        return {
            ...snapShot.data(),
            uid: snapShot.id,
        };
    }

    const getProfileUserByName = async (userName) => {
        const snapShot = await getDocs(collection(db, "users"));
        return snapShot.docs.filter((doc) => doc.data().name === userName).map((doc) => {
            const data = doc.data();
            data.uid = doc.id;
            return data;
        });
    }

    const getAllUsers = async () => {
        const snapShot = await getDocs(collection(db, "users"));
        return snapShot.docs.map((doc) => ({
            ...doc.data(),
            uid: doc.id,
        }));
    }

    // const getLikes = async (setIsLiked, setLikeCounts, currentUserId, postId) => {
    //     const snapShot = await getDocs(collection(db, "posts", postId, "liked"));
    //     const posts = snapShot.docs.map((doc) => ({ ...doc.data() }));

    //     const filteredPost = posts.filter((post) => post.userId === currentUserId);
    //     const isLikedData = filteredPost.length > 0 ? true : false;
    //     setIsLiked(isLikedData)

    //     setLikeCounts(posts.length)
    // }

    const updateLikes = async (currentUserId, postId, LikedArr, setLikedArr, isLiked, setIsLiked, likeCounts, setLikeCounts) => {
        const postRef = doc(db, "posts", postId);

        // console.log(`currentUserId: ${currentUserId}`)
        // console.log(`postId: ${postId}`)
        // console.log(`isLiked: ${isLiked}`)
        // console.log(`likeCounts: ${likeCounts}`)

        if (isLiked) {
            setIsLiked(false) // いいねを取り消したユーザーの状態を更新
            setLikeCounts(likeCounts - 1) // いいね数を更新
            setLikedArr(LikedArr.filter((liked) => liked !== currentUserId))
            await updateDoc(postRef, {
                liked: LikedArr.filter((liked) => liked !== currentUserId),
            }) // 投稿のいいねを取り消したユーザーを削除
        } else {
            setIsLiked(true) // いいねしたユーザーの状態を更新
            setLikeCounts(likeCounts + 1) // いいね数を更新
            setLikedArr([...LikedArr, currentUserId])
            await updateDoc(postRef, {
                liked: [...LikedArr, currentUserId],
            }) // 投稿にいいねしたユーザーを追加
            console.log([...LikedArr, currentUserId])
        }
    }

    const addFollowing = async (userId, followingId) => {
        const followingRef = doc(db, "users", userId, "following", followingId);
        const followerRef = doc(db, "users", followingId, "follower", userId);
        try {
            await setDoc(followingRef, {
                userId: followingId,
            });
            await setDoc(followerRef, {
                userId: userId,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const removeFollowing = async (userId, followingId) => {
        const followingRef = doc(db, "users", userId, "following", followingId);
        const followerRef = doc(db, "users", followingId, "follower", userId);
        try {
            await deleteDoc(followingRef);
            await deleteDoc(followerRef);
        } catch (error) {
            console.log(error);
        }
    }

    const getFollowing = async (userId) => {
        const snapShot = await getDocs(collection(db, "users", userId, "following"));
        return snapShot.docs.map((doc) => ({ ...doc.data() }));
    }

    const getFollower = async (userId) => {
        const snapShot = await getDocs(collection(db, "users", userId, "follower"));
        return snapShot.docs.map((doc) => ({ ...doc.data() }));
    }

    return { createPost, showPosts, getProfileUserById, getProfileUserByName, getAllUsers, updateLikes, addFollowing, removeFollowing, getFollowing, getFollower };
};