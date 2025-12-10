import { toast } from "react-toastify";
import {
  getAllStudents,
  addStudent as addStudentService,
  updateStudent as updateStudentService,
  deleteStudent as deleteStudentService,
  getStudentById,
  searchStudents,
} from "../../Services/studentService";

export const FETCH_STUDENTS_REQUEST = "FETCH_STUDENTS_REQUEST";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILURE = "FETCH_STUDENTS_FAILURE";
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const UPDATE_STUDENT_SUCCESS = "UPDATE_STUDENT_SUCCESS";
export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS";
export const FETCH_STUDENT_BY_ID_SUCCESS = "FETCH_STUDENT_BY_ID_SUCCESS";

export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_REQUEST });
  try {
    const students = await getAllStudents();
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: students });
  } catch (error) {
    dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error.message });
    toast.error("Failed to fetch students");
  }
};

export const addStudent = (studentData) => async (dispatch) => {
  try {
    const student = await addStudentService(studentData);
    dispatch({ type: ADD_STUDENT_SUCCESS, payload: student });
    toast.success("Student added successfully!");
    return student.id;
  } catch (error) {
    toast.error("Failed to add student");
    throw error;
  }
};

export const updateStudent = (id, updatedData) => async (dispatch) => {
  try {
    const student = await updateStudentService(id, updatedData);
    dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: student });
    toast.success("Student updated successfully!");
  } catch (error) {
    toast.error("Failed to update student");
    throw error;
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await deleteStudentService(id);
    dispatch({ type: DELETE_STUDENT_SUCCESS, payload: id });
    toast.success("Student deleted successfully!");
  } catch (error) {
    toast.error("Failed to delete student");
    throw error;
  }
};

export const fetchStudentById = (id) => async (dispatch) => {
  try {
    const student = await getStudentById(id);
    dispatch({ type: FETCH_STUDENT_BY_ID_SUCCESS, payload: student });
  } catch (error) {
    toast.error("Failed to fetch student");
    throw error;
  }
};

export const searchAndSortStudents = (searchTerm, sortField, sortDirection) => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_REQUEST });
  try {
    const students = await searchStudents(searchTerm, sortField, sortDirection);
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: students });
  } catch (error) {
    dispatch({ type: FETCH_STUDENTS_FAILURE, payload: error.message });
    toast.error("Failed to search students");
  }
};