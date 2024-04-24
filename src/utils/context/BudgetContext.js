import { createContext, useContext, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const addBudget = async (formData, id) => {
    try {
      setLoading(true);
      const userDocRef = doc(db, "budgets", id);

      const budgetSubcollectionRef = collection(userDocRef, "content");
      const newBudgetRef = await addDoc(budgetSubcollectionRef, {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setLoading(false);

      return { success: true, data: newBudgetRef.id };
    } catch (error) {
      console.error("Error adding document: ", error);
      return { success: false, msg: error.msg };
    }
  };

  const getBudget = async (userId) => {
    try {
      setLoading(true);
      // Reference the user's document within the 'budget' collection
      const userDocRef = doc(db, "budgets", userId);

      // Reference the 'content' subcollection within the user's document
      const contentCollectionRef = collection(userDocRef, "content");

      // Retrieve all documents within the 'content' subcollection
      const querySnapshot = await getDocs(contentCollectionRef);

      // Map over the documents to extract their data
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLoading(false);

      return data;
    } catch (error) {
      console.error("Error getting documents: ", error);
      return { success: false, msg: error.message };
    }
  };

  const getBudgetByCategory = async (userId, category) => {
    try {
      setLoading(true);
      const userDocRef = doc(db, "budgets", userId);
      const contentCollectionRef = collection(userDocRef, "content");
      const querySnapshot = await getDocs(contentCollectionRef);
      const data = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().category === category) {
          data.push({ id: doc.id, ...doc.data() });
        }
      });
      setLoading(false);

      return data;
    } catch (error) {
      console.error("Error getting documents: ", error);
      return { success: false, msg: error.message };
    }
  };

  const deleteBudget = async (userId, budgetId) => {
    try {
      setLoading(true);
      const userDocRef = doc(db, "budgets", userId);
      const contentCollectionRef = collection(userDocRef, "content");
      const budgetDocRef = doc(contentCollectionRef, budgetId);
      await deleteDoc(budgetDocRef);
      setLoading(false);

      return { success: true };
    } catch (error) {
      console.error("Error deleting document: ", error);
      return { success: false, msg: error.message };
    }
  };

  const editBudget = async (userId, budgetId, description) => {
    try {
      setLoading(true);
      const budgetDocRef = doc(db, "budgets", userId, "content", budgetId);
      await updateDoc(budgetDocRef, { description: description });
      setLoading(false);

      return { success: true };
    } catch (error) {
      console.error("Error updating document: ", error);
      return { success: false, msg: error.message };
    }
  };

  return (
    <BudgetContext.Provider
      value={{
        addBudget,
        getBudget,
        deleteBudget,
        getBudgetByCategory,
        editBudget,
        loading
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
