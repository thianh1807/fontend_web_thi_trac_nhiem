import { create } from "zustand";

// store để lưu dữ liệu người dùng
export const useStore = create((set) => ({
  dataUsers: [],
  setDataUsers: (data) => set({ dataUsers: data }),
}));

// store để lưu dữ liệu câu hỏi
export const questionStore = create((set) => ({
  dataQuestion: [],
  setQuestion: (data) => set({ dataQuestion: data }),
}));

// store để refresh dữ liệu
export const refreshStore = create((set) => ({
  dataRefresh: [],
  setRefresh: (data) => set({ dataRefresh: data }),
}));
