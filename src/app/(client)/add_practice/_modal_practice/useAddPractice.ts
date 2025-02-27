import { useState, useEffect } from "react";
import { FormData, Question } from "./types";
import { useStore } from "@/app/store";
import { addPractice, updatePractice } from "@/app/service/practice_api";
import { toast } from "react-toastify";

export const useAddPractice = (
  practiceEdit: any,
  setPracticeEdit: (value: any) => void,
  setIsOpenModalCreate: (value: boolean) => void,
  setRefresh: (value: any) => void
) => {
  const { dataUsers } = useStore();

  const initialFormData: FormData = {
    subject: "",
    duration: "30",
    point: "10",
    lecturer: dataUsers.username || "",
    status_exam: false,
  };

  const initialQuestion: Question = {
    question: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    results: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [questions, setQuestions] = useState<Question[]>([initialQuestion]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (practiceEdit) {
      setFormData({
        subject: practiceEdit.subject || "",
        duration: practiceEdit.duration || "30",
        point: practiceEdit.point || "10",
        lecturer: practiceEdit.lecturer || dataUsers.username || "",
        status_exam: practiceEdit.status_exam || false,
      });

      if (practiceEdit.question) {
        setQuestions(
          practiceEdit.question.map((q: any) => ({
            question: q.question,
            answerA: q.answerA,
            answerB: q.answerB,
            answerC: q.answerC,
            answerD: q.answerD,
            results: q.results,
          }))
        );
      }
    }
  }, [practiceEdit, dataUsers.username]);

  const resetFormAndClose = () => {
    setFormData(initialFormData);
    setQuestions([initialQuestion]);
    setErrors({});
    setIsOpenModalCreate(false);
    setPracticeEdit(null);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Vui lòng nhập môn thi";
    }

    if (!formData.duration) {
      newErrors.duration = "Vui lòng nhập thời gian";
    } else if (parseInt(formData.duration) <= 0) {
      newErrors.duration = "Thời gian phải lớn hơn 0";
    }

    if (!formData.point) {
      newErrors.point = "Vui lòng nhập điểm";
    } else if (parseInt(formData.point) <= 0) {
      newErrors.point = "Điểm phải lớn hơn 0";
    }

    questions.forEach((question, index) => {
      if (!question.question.trim()) {
        newErrors[`question_${index}`] = "Thiếu nội dung";
      }
      if (!question.answerA.trim()) {
        newErrors[`question_${index}`] = "Thiếu đáp án";
      }
      if (!question.answerB.trim()) {
        newErrors[`question_${index}`] = "Thiếu đáp án";
      }
      if (!question.answerC.trim()) {
        newErrors[`question_${index}`] = "Thiếu đáp án";
      }
      if (!question.answerD.trim()) {
        newErrors[`question_${index}`] = "Thiếu đáp án";
      }
      if (!question.results.trim()) {
        newErrors[`question_${index}`] = "Thiếu đáp án đúng";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    toast.dismiss();
    if (validateForm()) {
      try {
        let data;
        if (practiceEdit) {
          data = await updatePractice(
            {
              ...formData,
              question: questions,
            },
            practiceEdit.id
          );
          toast.success("Cập nhật bài thi thành công!");
        } else {
          data = await addPractice({
            ...formData,
            question: questions,
          });
          toast.success("Thêm bài thi thành công!");
          setRefresh((prev: any) => !prev);
        }

        if (data) {
          resetFormAndClose();
        }
      } catch (error: any) {
        toast.error(error.message || "Có lỗi xảy ra khi xử lý bài thi");
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleEdit = async () => {
    if (validateForm()) {
      try {
        const data = await updatePractice(
          {
            ...formData,
            question: questions,
          },
          practiceEdit.documentId
        );
        if (data.data) {
          resetFormAndClose();
          setRefresh((prev: any) => !prev);
          toast.success("Cập nhật thành công!");
        }
      } catch (error: any) {
        toast.error(error.message || "Có lỗi xảy ra khi cập nhật!");
      }
    } else {
      toast.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);

    // Xóa lỗi khi người dùng nhập
    const errorKey = `${field}_${index}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
        results: "",
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);

    // Xóa các lỗi liên quan đến câu hỏi bị xóa
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach((key) => {
      if (key.endsWith(`_${index}`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  return {
    formData,
    setFormData,
    questions,
    setQuestions,
    errors,
    setErrors,
    resetFormAndClose,
    handleSubmit,
    handleEdit,
    handleQuestionChange,
    addQuestion,
    removeQuestion,
  };
};
