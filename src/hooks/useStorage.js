import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

export const useStorage = () => {
    const uploadImage = async (postId, file, setIsUploading, setIsUploaded) => {
        const iRef = ref(storage, "postImages/" + postId + file.name.match(/\.(\w+)$/)[0])
        await uploadBytesResumable(iRef, file).on(
            "state_changed",
            (snapshot) => {
                setIsUploading(true);
            },
            (error) => {
                console.log(error);
            },
            () => {
                setIsUploading(false);
                setIsUploaded(true);
            }
        );
    };
    return { uploadImage };
};