import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminAPI } from "../api/admin"

// Admin Management Hooks
export const useCreateAdmin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: adminAPI.createAdmin,
    onSuccess: (data) => {
      console.log("✅ Admin created successfully:", data)
      queryClient.invalidateQueries(["admins"])
      alert("Admin created successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to create admin:", error)
      alert("Failed to create admin: " + (error.message || "Unknown error"))
    },
  })
}

export const useAllAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: adminAPI.getAllAdmins,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching admins:", error)
    },
  })
}

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: adminAPI.getAllUsers,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching users:", error)
    },
  })
}

// Lesson Management Hooks
export const useAllLessons = (filters = {}) => {
  return useQuery({
    queryKey: ["lessons", filters],
    queryFn: () => adminAPI.getAllLessons(filters),
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching lessons:", error)
    },
  })
}

export const useLessonById = (lessonId) => {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => adminAPI.getLessonById(lessonId),
    enabled: !!lessonId,
    onError: (error) => {
      console.error("Error fetching lesson:", error)
    },
  })
}

export const useCreateLesson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: adminAPI.createLesson,
    onSuccess: (data) => {
      console.log("✅ Lesson created successfully:", data)
      queryClient.invalidateQueries(["lessons"])
      alert("Lesson created successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to create lesson:", error)
      alert("Failed to create lesson: " + (error.message || "Unknown error"))
    },
  })
}

export const useUpdateLesson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ lessonId, lessonData }) => adminAPI.updateLesson(lessonId, lessonData),
    onSuccess: (data) => {
      console.log("✅ Lesson updated successfully:", data)
      queryClient.invalidateQueries(["lessons"])
      alert("Lesson updated successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to update lesson:", error)
      alert("Failed to update lesson: " + (error.message || "Unknown error"))
    },
  })
}

export const useDeleteLesson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: adminAPI.deleteLesson,
    onSuccess: (data) => {
      console.log("✅ Lesson deleted successfully:", data)
      queryClient.invalidateQueries(["lessons"])
      alert("Lesson deleted successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to delete lesson:", error)
      alert("Failed to delete lesson: " + (error.message || "Unknown error"))
    },
  })
}

// Exam Management Hooks
export const useAllExams = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: adminAPI.getAllExams,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching exams:", error)
    },
  })
}

export const useExamById = (examId) => {
  return useQuery({
    queryKey: ["exam", examId],
    queryFn: () => adminAPI.getExamById(examId),
    enabled: !!examId,
    onError: (error) => {
      console.error("Error fetching exam:", error)
    },
  })
}

export const useCreateExam = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: adminAPI.createExam,
    onSuccess: (data) => {
      console.log("✅ Exam created successfully:", data)
      queryClient.invalidateQueries(["exams"])
      alert("Exam created successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to create exam:", error)
      alert("Failed to create exam: " + (error.message || "Unknown error"))
    },
  })
}

export const useUpdateExam = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ examId, examData }) => adminAPI.updateExam(examId, examData),
    onSuccess: (data) => {
      console.log("✅ Exam updated successfully:", data)
      queryClient.invalidateQueries(["exams"])
      alert("Exam updated successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to update exam:", error)
      alert("Failed to update exam: " + (error.message || "Unknown error"))
    },
  })
}

export const useDeleteExam = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: adminAPI.deleteExam,
    onSuccess: (data) => {
      console.log("✅ Exam deleted successfully:", data)
      queryClient.invalidateQueries(["exams"])
      alert("Exam deleted successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to delete exam:", error)
      alert("Failed to delete exam: " + (error.message || "Unknown error"))
    },
  })
}

// Question Management Hooks
export const useAllQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: adminAPI.getAllQuestions,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching questions:", error)
    },
  })
}

export const useQuestionById = (questionId) => {
  return useQuery({
    queryKey: ["question", questionId],
    queryFn: () => adminAPI.getQuestionById(questionId),
    enabled: !!questionId,
    onError: (error) => {
      console.error("Error fetching question:", error)
    },
  })
}

export const useCreateQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: adminAPI.createQuestion,
    onSuccess: (data) => {
      console.log("✅ Question created successfully:", data)
      queryClient.invalidateQueries(["questions"])
      alert("Question created successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to create question:", error)
      alert("Failed to create question: " + (error.message || "Unknown error"))
    },
  })
}

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ questionId, questionData }) => adminAPI.updateQuestion(questionId, questionData),
    onSuccess: (data) => {
      console.log("✅ Question updated successfully:", data)
      queryClient.invalidateQueries(["questions"])
      alert("Question updated successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to update question:", error)
      alert("Failed to update question: " + (error.message || "Unknown error"))
    },
  })
}

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: adminAPI.deleteQuestion,
    onSuccess: (data) => {
      console.log("✅ Question deleted successfully:", data)
      queryClient.invalidateQueries(["questions"])
      alert("Question deleted successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to delete question:", error)
      alert("Failed to delete question: " + (error.message || "Unknown error"))
    },
  })
}

// Dashboard Hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: adminAPI.getDashboardStats,
    staleTime: 2 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching dashboard stats:", error)
    },
  })
}

export const usePendingPayments = () => {
  return useQuery({
    queryKey: ["pendingPayments"],
    queryFn: adminAPI.getPendingPayments,
    staleTime: 1 * 60 * 1000,
    onError: (error) => {
      console.error("Error fetching pending payments:", error)
    },
  })
}

export const useApproveLessonPayment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: adminAPI.approveLessonPayment,
    onSuccess: (data) => {
      console.log("✅ Payment approved successfully:", data)
      queryClient.invalidateQueries(["pendingPayments"])
      alert("Payment approved successfully!")
    },
    onError: (error) => {
      console.error("❌ Failed to approve payment:", error)
      alert("Failed to approve payment: " + (error.message || "Unknown error"))
    },
  })
}
