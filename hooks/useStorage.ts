import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const useStorage = () => {
  const uploadFile = async (path: string, file: File | Blob) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return { success: true, url };
    } catch (error) {
      console.error('Error uploading file: ', error);
      return { success: false, error };
    }
  };

  const uploadBase64 = async (path: string, base64: string) => {
    try {
      const response = await fetch(base64);
      const blob = await response.blob();
      return await uploadFile(path, blob);
    } catch (error) {
      console.error('Error uploading base64: ', error);
      return { success: false, error };
    }
  };

  const deleteFile = async (path: string) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting file: ', error);
      return { success: false, error };
    }
  };

  const getFileUrl = async (path: string) => {
    try {
      const storageRef = ref(storage, path);
      const url = await getDownloadURL(storageRef);
      return { success: true, url };
    } catch (error) {
      console.error('Error getting file URL: ', error);
      return { success: false, error };
    }
  };

  return { uploadFile, uploadBase64, deleteFile, getFileUrl };
};
