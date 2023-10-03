import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const useFirestore = () => {
    const createPost = async (postId, userId, pBody, pCommentTo, pImageURL) => {
        const pRef = doc(db, "posts", postId)
        try{
            await setDoc(pRef, {
                body: pBody,
                username: userId,
                commentTo: pCommentTo,
                createdAt: Timestamp.now(),
                imageURL: pImageURL,
                like_count: 0,
            });
        }catch(error){
            console.log(error);
        }
    };
    return { createPost };
};