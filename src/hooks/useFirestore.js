import { db } from "@/lib/firebase";
import { FieldValue, doc, serverTimestamp, setDoc, getDocs, collection, deleteDoc, getDoc } from "firebase/firestore";

export const useFirestore = () => {
    const createPost = async (username, postId, userId, pBody, pImageURL, isPrivate) => {
        const pRef = doc(db, "posts", postId)
        try{
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
        }catch(error){
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

    return { createPost, showPosts, getProfileUserById, getProfileUserByName, getAllUsers, addFollowing, removeFollowing, getFollowing, getFollower };
};