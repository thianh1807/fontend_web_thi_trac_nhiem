import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getItemExamQuestion, updateExam } from "@/app/service/examquestion";
import { toast } from "react-toastify";
import { useStore } from "@/app/store";
import QuestionForm from "@/app/_components/common/QuestionForm";

import { validateForm } from "./form-handlers";
import { FormData, Question, ModalAddExamProps } from "./types";
import ExamForm from "./ExamForm";

const ModalAddExam: React.FC<ModalAddExamProps> = ({
  onClose,
  setReload,
  reload,
  dataEdit,
  setDataEdit,
}) => {
  const { dataUsers } = useStore();

  const initialFormData: FormData = {
    class: "",
    lecturer: dataUsers?.username || "",
    subject: "",
    exam_day: "",
    day_close: "",
    point: "10",
    duration: "30",
    see_exam_results: true,
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

  const [formData, setFormData] = useState<FormData>(
    dataEdit
      ? {
          ...initialFormData,
          ...dataEdit,
          lecturer: dataEdit.username || dataUsers?.username || "",
          exam_day: dataEdit.exam_day
            ? new Date(dataEdit.exam_day).toLocaleString("sv-SE").slice(0, 16)
            : "",
          day_close: dataEdit.day_close
            ? new Date(dataEdit.day_close).toLocaleString("sv-SE").slice(0, 16)
            : "",
        }
      : initialFormData
  );

  const [questions, setQuestions] = useState<Question[]>(
    dataEdit
      ? dataEdit.question.map((item: any) => ({
          question: item.question,
          answerA: item.answerA,
          answerB: item.answerB,
          answerC: item.answerC,
          answerD: item.answerD,
          results: item.results,
        }))
      : [initialQuestion]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (dataUsers?.username) {
      setFormData((prev) => ({ ...prev, lecturer: dataUsers.username }));
    }
  }, [dataUsers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      return newQuestions;
    });
    setErrors((prev) => ({ ...prev, [`question_${index}`]: "" }));
  };

  const addQuestion = () =>
    setQuestions((prev) => [...prev, { ...initialQuestion }]);

  const removeQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`question_${index}`];
      return newErrors;
    });
  };

  const resetFormAndClose = () => {
    setFormData(initialFormData);
    setQuestions([initialQuestion]);
    setErrors({});
    if (setDataEdit) {
      setDataEdit(null);
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData, questions, setErrors)) return;

    const data = await getItemExamQuestion(
      questions,
      formData,
      dataUsers.information_teacher.mgv
    );
    if (data.ok) {
      resetFormAndClose();
      setReload(!reload);
    }
  };

  const handleUpdateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData, questions, setErrors)) return;

    const data = await updateExam(
      dataEdit.id,
      formData,
      questions,
      dataUsers.information_teacher.mgv
    );
    if (data.ok) {
      resetFormAndClose();
      setReload(!reload);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl mx-4 h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {dataEdit ? "Cập nhật bài thi" : "Thêm bài thi mới"}
          </h2>
          <button
            onClick={resetFormAndClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex overflow-hidden">
          <div className="flex flex-col lg:flex-row h-full w-full overflow-y-auto">
            <div className="w-full flex-1 p-6 border-r">
              <ExamForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            </div>

            <div className="w-full flex-1 p-6 border-r">
              <QuestionForm
                questions={questions}
                handleQuestionChange={handleQuestionChange}
                addQuestion={addQuestion}
                removeQuestion={removeQuestion}
                errors={errors}
              />
            </div>
          </div>
        </form>

        <div className="border-t p-6 flex justify-end gap-3 bg-gray-50">
          <button
            type="button"
            onClick={resetFormAndClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={!dataEdit ? handleSubmit : handleUpdateExam}
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            {dataEdit ? "Cập nhật" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddExam;
