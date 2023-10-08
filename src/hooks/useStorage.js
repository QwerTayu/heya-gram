import { storage } from "@/lib/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const useStorage = () => {
    const uploadImage = async (postId, file, setIsUploading, setIsUploaded) => {
        const iRef = ref(storage, "postImages/" + postId + ".jpg")
        await uploadBytesResumable(iRef, file).on(
            "state_changed",
            (snapshot) => {
                setIsUploading(true);
            },
            (error) => {
                console.log(error);
            },
            async () => {
                const url = await showImage(postId);
                setIsUploading(false);
                setIsUploaded(true);
                return url;
            }
        );
    };

    const showImage = async (postId) => {
        // ファイルに応じた拡張子をつける
        const iRef = ref(storage, "gs://heya-gram.appspot.com/postImages/" + postId + ".jpg");
        const url = await getDownloadURL(iRef);
        return url;
    };

    const deleteImage = async (postId) => {
        const iRef = ref(storage, "postImages/" + postId + ".jpg");
        await deleteObject(iRef);
    };

    return { uploadImage, showImage, deleteImage };
};