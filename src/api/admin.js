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
    console.log("API Response:", response.data) // Debug log
    return response.data
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message)
    throw error.response?.data || { message: error.message || "An error occurred" }
  }
}

// Admin Management API
export const adminAPI = {
  // Admin Management
  createAdmin: async (adminData) => {
    console.log("Creating admin:", adminData)
    return handleRequest(axios.post(`${API_BASE}/admin/create-admin`, adminData, getAuthHeaders()))
  },

  getAllAdmins: async () => {
    return handleRequest(axios.get(`${API_BASE}/admin/all-admin`, getAuthHeaders()))
  },

  getAllUsers: async () => {
    return handleRequest(axios.get(`${API_BASE}/admin/all-user`, getAuthHeaders()))
  },

  // Lesson Management - Fixed endpoints
  getAllLessons: async (filters = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value)
      }
    })
    return handleRequest(axios.get(`${API_BASE}/lesson?${params.toString()}`, getAuthHeaders()))
  },

  getLessonById: async (lessonId) => {
    return handleRequest(axios.get(`${API_BASE}/lesson/${lessonId}`, getAuthHeaders()))
  },

  createLesson: async (lessonData) => {
    console.log("Creating lesson:", lessonData)
    // Ensure required fields are present
    const payload = {
      title: lessonData.title,
      description: lessonData.description || "",
      classLevel: lessonData.classLevel,
      subject: lessonData.subject || "",
      price: Number(lessonData.price) || 0,
      duration: Number(lessonData.duration) || 0,
      videoUrl: lessonData.videoUrl || "",
      thumbnailUrl: lessonData.thumbnailUrl || "",
      isPaid: lessonData.isPaid !== false,
      scheduledDate: lessonData.scheduledDate || null,
    }
    return handleRequest(axios.post(`${API_BASE}/lesson`, payload, getAuthHeaders()))
  },

  updateLesson: async (lessonId, lessonData) => {
    console.log("Updating lesson:", lessonId, lessonData)
    const payload = {
      title: lessonData.title,
      description: lessonData.description || "",
      classLevel: lessonData.classLevel,
      subject: lessonData.subject || "",
      price: Number(lessonData.price) || 0,
      duration: Number(lessonData.duration) || 0,
      videoUrl: lessonData.videoUrl || "",
      thumbnailUrl: lessonData.thumbnailUrl || "",
      isPaid: lessonData.isPaid !== false,
      scheduledDate: lessonData.scheduledDate || null,
    }
    return handleRequest(axios.put(`${API_BASE}/lesson/${lessonId}`, payload, getAuthHeaders()))
  },

  deleteLesson: async (lessonId) => {
    console.log("Deleting lesson:", lessonId)
    return handleRequest(axios.delete(`${API_BASE}/lesson/${lessonId}`, getAuthHeaders()))
  },

  // Exam Management - Fixed endpoints and payload
  getAllExams: async () => {
    return handleRequest(axios.get(`${API_BASE}/exam`, getAuthHeaders()))
  },

  getExamById: async (examId) => {
    return handleRequest(axios.get(`${API_BASE}/exam/${examId}`, getAuthHeaders()))
  },

  createExam: async (examData) => {
    console.log("Creating exam:", examData)
    // Only include fields that are allowed by the API
    const payload = {
      title: examData.title,
      description: examData.description || "",
      classLevel: examData.classLevel,
      duration: Number(examData.duration),
      questions: examData.questions || [],
    }
    return handleRequest(axios.post(`${API_BASE}/exam`, payload, getAuthHeaders()))
  },

  updateExam: async (examId, examData) => {
    console.log("Updating exam:", examId, examData)
    // Only include fields that are allowed by the API
    const payload = {
      title: examData.title,
      description: examData.description || "",
      classLevel: examData.classLevel,
      duration: Number(examData.duration),
      questions: examData.questions || [],
    }
    return handleRequest(axios.put(`${API_BASE}/exam/${examId}`, payload, getAuthHeaders()))
  },

  deleteExam: async (examId) => {
    console.log("Deleting exam:", examId)
    return handleRequest(axios.delete(`${API_BASE}/exam/${examId}`, getAuthHeaders()))
  },

  // Question Management - Fixed endpoints and payload
  getAllQuestions: async () => {
    return handleRequest(axios.get(`${API_BASE}/question`, getAuthHeaders()))
  },

  getQuestionById: async (questionId) => {
    return handleRequest(axios.get(`${API_BASE}/question/get/${questionId}`, getAuthHeaders()))
  },

  createQuestion: async (questionData) => {
    console.log("Creating question:", questionData)
    // API expects 'text' field, not 'question', and doesn't allow 'explanation'
    const payload = {
      text: questionData.text, // API expects 'text' field
      type: questionData.type,
      options: questionData.options || [],
      correctAnswer: questionData.correctAnswer,
      exam: questionData.exam || null,
      points: Number(questionData.points) || 1,
    }
    return handleRequest(axios.post(`${API_BASE}/question`, payload, getAuthHeaders()))
  },

  updateQuestion: async (questionId, questionData) => {
    console.log("Updating question:", questionId, questionData)
    // API expects 'text' field, not 'question', and doesn't allow 'explanation'
    const payload = {
      text: questionData.text, // API expects 'text' field
      type: questionData.type,
      options: questionData.options || [],
      correctAnswer: questionData.correctAnswer,
      exam: questionData.exam || null,
      points: Number(questionData.points) || 1,
    }
    return handleRequest(axios.put(`${API_BASE}/question/${questionId}`, payload, getAuthHeaders()))
  },

  deleteQuestion: async (questionId) => {
    console.log("Deleting question:", questionId)
    return handleRequest(axios.delete(`${API_BASE}/question/${questionId}`, getAuthHeaders()))
  },

  // Payment Management - Mock implementation since API might not exist
  getPendingPayments: async () => {
    // Mock data for now - replace with actual API when available
    return {
      success: true,
      data: [
        {
          _id: "payment1",
          studentName: "John Doe",
          studentEmail: "john@example.com",
          lessonTitle: "Introduction to Mathematics",
          amount: 29.99,
          status: "pending",
          createdAt: new Date().toISOString(),
          paymentMethod: "Credit Card",
        },
        {
          _id: "payment2",
          studentName: "Jane Smith",
          studentEmail: "jane@example.com",
          lessonTitle: "Basic Science Concepts",
          amount: 19.99,
          status: "pending",
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          paymentMethod: "PayPal",
        },
      ],
    }
  },

  approveLessonPayment: async (paymentId) => {
    console.log("Approving payment:", paymentId)
    // Mock implementation - replace with actual API
    return { success: true, message: "Payment approved successfully" }
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    // This will aggregate data from other endpoints
    try {
      const [lessons, exams, users] = await Promise.all([
        adminAPI.getAllLessons(),
        adminAPI.getAllExams(),
        adminAPI.getAllUsers(),
      ])

      return {
        success: true,
        data: {
          totalLessons: lessons?.data?.length || 0,
          totalExams: exams?.data?.length || 0,
          totalUsers: users?.data?.length || 0,
          totalRevenue: 1250.75, // Mock data
          completedExams: 45, // Mock data
          studyHours: 1200, // Mock data
        },
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      return {
        success: false,
        data: {
          totalLessons: 0,
          totalExams: 0,
          totalUsers: 0,
          totalRevenue: 0,
          completedExams: 0,
          studyHours: 0,
        },
      }
    }
  },
}
