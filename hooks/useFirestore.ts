import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  Query
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

  // Tüm belgeleri getir
  const getDocuments = async (collectionName: string, conditions?: any[]) => {
    try {
      let q: any = collection(db, collectionName);
      
      if (conditions && conditions.length > 0) {
        q = query(q, ...conditions);
      }
      
      const querySnapshot = await getDocs(q);
      const documents: any[] = [];
      
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...(doc.data() as any) });
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