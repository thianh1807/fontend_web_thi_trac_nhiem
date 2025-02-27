import { FormData, Question } from "./types";
import { toast } from "react-toastify";

export const fieldLabels: { [key: string]: string } = {
  class: "lớp",
  lecturer: "giảng viên",
  subject: "môn thi",
  exam_day: "ngày thi",
  day_close: "ngày đóng",
  duration: "thời gian làm bài",
  point: "điểm",
  see_exam_results: "xem kết quả bài thi",
  status_exam: "trạng thái kỳ thi",
};

export const validateForm = (
  formData: FormData,
  questions: Question[],
  setErrors: (errors: Record<string, string>) => void
) => {
  toast.dismiss();
  const newErrors: Record<string, string> = {};
  const requiredFields = [
    "class",
    "lecturer",
    "subject",
    "exam_day",
    "day_close",
  ];

  requiredFields.forEach((field) => {
    if (!formData[field as keyof FormData]) {
      newErrors[field] = `Vui lòng điền ${
        fieldLabels[field as keyof typeof fieldLabels]
      }`;
    }
  });

  questions.forEach((q, index) => {
    if (Object.values(q).some((val) => !val)) {
      newErrors[
        `question_${index}`
      ] = `Vui lòng điền đầy đủ thông tin cho câu hỏi ${index + 1}`;
    }
  });

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) {
    toast.error("Vui lòng điền đầy đủ thông tin!");
    return false;
  }
  return true;
};
