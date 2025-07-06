import axios from "axios";

const API_BASE = "https://edu-master-delta.vercel.app";

// Get token from localStorage
const getAuthHeaders = () => ({
  headers: {
    token: localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

// Error handling wrapper
const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "An error occurred" };
  }
};

// Admin API
export const adminAPI = {
  // User Management
  getAllUsers: async () => {
    return handleRequest(
      axios.get(`${API_BASE}/admin/all-user`, getAuthHeaders())
    );
  },

  getAllAdmins: async () => {
    return handleRequest(
      axios.get(`${API_BASE}/admin/all-admin`, getAuthHeaders())
    );
  },

  deleteUser: async (userId) => {
    return handleRequest(
      axios.delete(`${API_BASE}/admin/delete-user/${userId}`, getAuthHeaders())
    );
  },

  // Lesson Management
  getAllLessons: async () => {
    return handleRequest(axios.get(`${API_BASE}/lesson`, getAuthHeaders()));
  },

  createLesson: async (lessonData) => {
    return handleRequest(
      axios.post(`${API_BASE}/lesson`, lessonData, getAuthHeaders())
    );
  },

  updateLesson: async (lessonId, lessonData) => {
    return handleRequest(
      axios.put(`${API_BASE}/lesson/${lessonId}`, lessonData, getAuthHeaders())
    );
  },

  deleteLesson: async (lessonId) => {
    return handleRequest(
      axios.delete(`${API_BASE}/lesson/${lessonId}`, getAuthHeaders())
    );
  },

  // Exam Management
  getAllExams: async () => {
    return handleRequest(axios.get(`${API_BASE}/exam`, getAuthHeaders()));
  },

  createExam: async (examData) => {
    return handleRequest(
      axios.post(`${API_BASE}/exam`, examData, getAuthHeaders())
    );
  },

  updateExam: async (examId, examData) => {
    return handleRequest(
      axios.put(`${API_BASE}/exam/${examId}`, examData, getAuthHeaders())
    );
  },

  deleteExam: async (examId) => {
    return handleRequest(
      axios.delete(`${API_BASE}/exam/${examId}`, getAuthHeaders())
    );
  },

  // Statistics
  getDashboardStats: async () => {
    return handleRequest(
      axios.get(`${API_BASE}/admin/dashboard-stats`, getAuthHeaders())
    );
  },

  getRevenueStats: async () => {
    return handleRequest(
      axios.get(`${API_BASE}/admin/revenue-stats`, getAuthHeaders())
    );
  },

  // Recent Activity
  getRecentPurchases: async () => {
    return handleRequest(
      axios.get(`${API_BASE}/admin/recent-purchases`, getAuthHeaders())
    );
  },

  getRecentExams: async () => {
    return handleRequest(
      axios.get(`${API_BASE}/admin/recent-exams`, getAuthHeaders())
    );
  },
};
