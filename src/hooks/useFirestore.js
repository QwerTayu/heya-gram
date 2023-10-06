import { db } from "@/lib/firebase";
import { FieldValue, doc, serverTimestamp, setDoc, getDocs, collection, deleteDoc, getDoc } from "firebase/firestore";

export const useFirestore = () => {
    const createPost = async (username, postId, userId, pBody, pCommentTo, pImageURL, isPrivate) => {
        const pRef = doc(db, "posts", postId)
        try{
            await setDoc(pRef, {
                postId: postId,
                body: pBody,
                username: username,
                userId: userId,
                commentTo: pCommentTo,
                createdAt: serverTimestamp(FieldValue),
                imageURL: pImageURL,
                like_cnt: 0,
                reply_cnt: 0,
                bookmark_cnt: 0,
                day_cnt: 0,
                isPrivate: isPrivate,
            });
        }catch(error){
            console.log(error);
        }
    };

    const showPosts = async () => {
        const snapShot = await getDocs(collection(db, "posts"));
        return snapShot.docs.map((doc) => ({ ...doc.data() }));
    };

    // const showPost = async (postId) => {
    //     const pRef = doc(db, "posts", postId)
    //     try{
    //         const docSnap = await getDoc(pRed);
    //         if (docSnap.exists()){
    //             return docSnap.data();
    //         }
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    const getProfileUserById = async (userId) => {
        const snapShot = await getDoc(doc(db, "users", userId));
        return snapShot.data();
    }

    const getProfileUserByName = async (userName) => {
        const snapShot = await getDocs(collection(db, "users"));
        return snapShot.docs.filter((doc) => doc.data().name === userName).map((doc) => {
            const data = doc.data();
            data.uid = doc.id;
            return data;
        });
    }

    const addFollowing = async (userId, followingId) => {
        const followingRef = doc(db, "users", userId, "following", followingId);
        const followerRef = doc(db, "users", followingId, "follower", userId);
        try{
            await setDoc(followingRef, {
                userId: followingId,
            });
            await setDoc(followerRef, {
                userId: userId,
            });
        }catch(error){
            console.log(error);
        }
    }

    const removeFollowing = async (userId, followingId) => {
        const followingRef = doc(db, "users", userId, "following", followingId);
        const followerRef = doc(db, "users", followingId, "follower", userId);
        try{
            await deleteDoc(followingRef);
            await deleteDoc(followerRef);
        }catch(error){
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

    return { createPost, showPosts, getProfileUserById, getProfileUserByName, addFollowing, removeFollowing, getFollowing, getFollower };
};