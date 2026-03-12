import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc
} from 'firebase/firestore';

export const useFirestore = () => {
  // Belge ekle
  const addDocument = async (collectionName: string, data: any) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Belge güncelle
  const updateDocument = async (collectionName: string, id: string, data: any) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { ...data, updatedAt: new Date() });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Belge sil
  const deleteDocument = async (collectionName: string, id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Tek belge getir
  const getDocument = async (collectionName: string, id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
      } else {
        return { success: false, error: 'Doküman bulunamadı' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Tüm belgeleri getir
  const getDocuments = async (collectionName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return { 
    addDocument, 
    updateDocument, 
    deleteDocument, 
    getDocument,
    getDocuments 
  };
};