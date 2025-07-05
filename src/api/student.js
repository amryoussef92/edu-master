import axios from "axios"

const API_BASE = "https://edu-master-delta.vercel.app"

// Get token from localStorage
const getAuthHeaders = () => ({
  headers: {
    token: localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
})

// Error handling wrapper
const handleRequest = async (request) => {
  try {
    const response = await request
    return response.data
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message)
    throw error.response?.data || { message: "An error occurred" }
  }
}

// Lessons API
export const lessonAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value)
      }
    })
    return handleRequest(axios.get(`${API_BASE}/lesson?${params.toString()}`, getAuthHeaders()))
  },

  getPurchased: async () => {
    return handleRequest(axios.get(`${API_BASE}/lesson/my/purchased`, getAuthHeaders()))
  },

  pay: async (lessonId) => {
    return handleRequest(axios.post(`${API_BASE}/lesson/pay/${lessonId}`, {}, getAuthHeaders()))
  },
}

// Exams API
export const examAPI = {
  getAvailable: async () => {
    return handleRequest(axios.get(`${API_BASE}/exam`, getAuthHeaders()))
  },

  start: async (examId) => {
    return handleRequest(axios.post(`${API_BASE}/studentExam/start/${examId}`, {}, getAuthHeaders()))
  },

  submit: async (examId, answers) => {
    return handleRequest(axios.post(`${API_BASE}/studentExam/submit/${examId}`, { answers }, getAuthHeaders()))
  },

  getScore: async (examId) => {
    return handleRequest(axios.get(`${API_BASE}/studentExam/exams/score/${examId}`, getAuthHeaders()))
  },

  getRemainingTime: async (examId) => {
    return handleRequest(axios.get(`${API_BASE}/studentExam/exams/remaining-time/${examId}`, getAuthHeaders()))
  },
}

// User API
export const userAPI = {
  getProfile: async () => {
    return handleRequest(axios.get(`${API_BASE}/user/profile`, getAuthHeaders()))
  },

  updateProfile: async (profileData) => {
    return handleRequest(axios.put(`${API_BASE}/user/profile`, profileData, getAuthHeaders()))
  },

  getStats: async () => {
    return handleRequest(axios.get(`${API_BASE}/user/stats`, getAuthHeaders()))
  },
}
