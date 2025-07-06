import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "../api/admin";

// User Management hooks
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: adminAPI.getAllUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAllAdmins = () => {
  return useQuery({
    queryKey: ["allAdmins"],
    queryFn: adminAPI.getAllAdmins,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminAPI.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });
};

// Lesson Management hooks
export const useAllLessons = () => {
  return useQuery({
    queryKey: ["allLessons"],
    queryFn: adminAPI.getAllLessons,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminAPI.createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["allLessons"]);
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, lessonData }) =>
      adminAPI.updateLesson(lessonId, lessonData),
    onSuccess: () => {
      queryClient.invalidateQueries(["allLessons"]);
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminAPI.deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries(["allLessons"]);
    },
  });
};

// Exam Management hooks
export const useAllExams = () => {
  return useQuery({
    queryKey: ["allExams"],
    queryFn: adminAPI.getAllExams,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminAPI.createExam,
    onSuccess: () => {
      queryClient.invalidateQueries(["allExams"]);
    },
  });
};

export const useUpdateExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ examId, examData }) => adminAPI.updateExam(examId, examData),
    onSuccess: () => {
      queryClient.invalidateQueries(["allExams"]);
    },
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminAPI.deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries(["allExams"]);
    },
  });
};

// Dashboard Statistics hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: adminAPI.getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRevenueStats = () => {
  return useQuery({
    queryKey: ["revenueStats"],
    queryFn: adminAPI.getRevenueStats,
    staleTime: 5 * 60 * 1000,
  });
};

// Recent Activity hooks
export const useRecentPurchases = () => {
  return useQuery({
    queryKey: ["recentPurchases"],
    queryFn: adminAPI.getRecentPurchases,
    staleTime: 2 * 60 * 1000, // 2 minutes for recent activity
  });
};

export const useRecentExams = () => {
  return useQuery({
    queryKey: ["recentExams"],
    queryFn: adminAPI.getRecentExams,
    staleTime: 2 * 60 * 1000,
  });
};
