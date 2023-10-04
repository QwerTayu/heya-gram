import { db } from "@/lib/firebase";
import { FieldValue, doc, serverTimestamp, setDoc, getDocs, collection } from "firebase/firestore";

export const useFirestore = () => {
    const createPost = async (postId, userId, pBody, pCommentTo, pImageURL, isPrivate) => {
        const pRef = doc(db, "posts", postId)
        try{
            await setDoc(pRef, {
                postId: postId,
                body: pBody,
                username: userId,
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

    return { createPost, showPosts };
};