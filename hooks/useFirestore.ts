import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query
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
        return { success: true, data: { id: docSnap.id, ...(docSnap.data() as any) } };
      } else {
        return { success: false, error: 'Doküman bulunamadı' };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Tüm belgeleri getir (Hataları tamamen susturduğumuz kısım)
  const getDocuments = async (collectionName: string, conditions?: any[]) => {
    try {
      const colRef = collection(db, collectionName);
      // Sorgu varsa sorgula, yoksa koleksiyonun tamamını al
      const q = conditions && conditions.length > 0 
        ? query(colRef, ...conditions) 
        : colRef;
      
      const querySnapshot = await getDocs(q as any);
      const documents: any[] = [];
      
      querySnapshot.forEach((doc: any) => {
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