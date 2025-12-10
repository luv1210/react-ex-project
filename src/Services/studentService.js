import { db } from "../Config/firebaseConfig"; // make sure path matches your firebase.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const studentsCollection = collection(db, "students");

// Helper: remove undefined values
const cleanData = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(([ , value]) => value !== undefined)
  );
};

export const getAllStudents = async () => {
  const snapshot = await getDocs(studentsCollection);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addStudent = async (studentData) => {
  if (!studentData || !studentData.name) {
    throw new Error("Student name is required");
  }
  const cleanStudent = cleanData(studentData);
  const docRef = await addDoc(studentsCollection, cleanStudent);
  return { id: docRef.id, ...cleanStudent };
};

export const updateStudent = async (id, updatedData) => {
  if (!id) throw new Error("Student ID is required");
  const cleanUpdate = cleanData(updatedData);
  const docRef = doc(db, "students", id);
  await updateDoc(docRef, cleanUpdate);
  return { id, ...cleanUpdate };
};

export const deleteStudent = async (id) => {
  if (!id) throw new Error("Student ID is required");
  const docRef = doc(db, "students", id);
  await deleteDoc(docRef);
};

export const getStudentById = async (id) => {
  if (!id) throw new Error("Student ID is required");
  const docRef = doc(db, "students", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) throw new Error("Student not found");
  return { id: docSnap.id, ...docSnap.data() };
};

export const searchStudents = async (searchTerm, sortField, sortDirection) => {
  let qRef = studentsCollection;

  if (searchTerm) {
    qRef = query(
      qRef,
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff")
    );
  }

  if (sortField) {
    qRef = query(qRef, orderBy(sortField, sortDirection || "asc"));
  }

  const snapshot = await getDocs(qRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};
