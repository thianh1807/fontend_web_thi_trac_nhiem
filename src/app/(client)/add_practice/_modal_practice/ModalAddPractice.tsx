import React from "react";
import { Button, Checkbox } from "@nextui-org/react";
import QuestionForm from "@/app/_components/common/QuestionForm";
import Icon from "@/app/_components/common/Icon";
import { ModalAddPracticeProps } from "./types";
import { useAddPractice } from "./useAddPractice";

export default function ModalAddPractice({
  isOpenModalCreate,
  setIsOpenModalCreate,
  practiceEdit,
  setPracticeEdit,
  setRefresh,
}: ModalAddPracticeProps) {
  const {
    formData,
    setFormData,
    questions,
    errors,
    resetFormAndClose,
    handleSubmit,
    handleEdit,
    handleQuestionChange,
    addQuestion,
    removeQuestion,
  } = useAddPractice(
    practiceEdit,
    setPracticeEdit,
    setIsOpenModalCreate,
    setRefresh
  );

  if (!isOpenModalCreate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={resetFormAndClose} />

      <div className="relative bg-white rounded-lg w-[95%] md:w-[80%] h-[95vh] md:h-[90vh] overflow-y-auto">
        <div className="px-4">
          <div className="flex justify-between items-center mb-4 md:mb-6 sticky top-0 bg-white z-10 py-2">
            <h1 className="text-lg md:text-2xl font-bold">
              {practiceEdit ? "Chỉnh sửa bài thi" : "Thêm bài thi thử mới"}
            </h1>
            <div onClick={resetFormAndClose} className="p-1">
              <Icon
                icon="X"
                className="hover:bg-gray-100 rounded-full p-1 cursor-pointer"
                size={32}
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-8">
            <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-6">
              <div className="w-full grid grid-cols-1 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-md font-medium">Môn thi</label>
                  <input
                    type="text"
                    placeholder="Nhập tên môn thi"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.subject ? "border-red-500" : ""
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-md font-medium">Tên giảng viên</label>
                  <input
                    type="text"
                    placeholder="Tên giảng viên"
                    value={formData.lecturer}
                    readOnly
                    className="w-full p-3 border rounded-lg bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-md font-medium">
                    Thời gian làm bài (phút)
                  </label>
                  <input
                    type="number"
                    placeholder="Nhập thời gian"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.duration ? "border-red-500" : ""
                    }`}
                  />
                  {errors.duration && (
                    <p className="text-red-500 text-sm">{errors.duration}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-md font-medium">Điểm</label>
                  <input
                    type="number"
                    placeholder="Nhập điểm"
                    value={formData.point}
                    onChange={(e) =>
                      setFormData({ ...formData, point: e.target.value })
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.point ? "border-red-500" : ""
                    }`}
                  />
                  {errors.point && (
                    <p className="text-red-500 text-sm">{errors.point}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <Checkbox
                    isSelected={formData.status_exam}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status_exam: value })
                    }
                    size="lg"
                  >
                    <span className="text-sm md:text-base">
                      Trạng thái (hiện thị bài thi)
                    </span>
                  </Checkbox>
                </div>
              </div>

              <div className="bg-gray-50 w-full rounded-xl p-3 md:p-6">
                <QuestionForm
                  questions={questions}
                  handleQuestionChange={handleQuestionChange}
                  addQuestion={addQuestion}
                  removeQuestion={removeQuestion}
                  errors={errors}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-y-3 sticky bottom-0 bg-white p-2 border-t">
            <Button
              color="danger"
              variant="light"
              onClick={resetFormAndClose}
              className="min-w-[90px] md:min-w-[120px]"
              size="lg"
            >
              Hủy
            </Button>
            <Button
              color="primary"
              onClick={practiceEdit ? handleEdit : handleSubmit}
              className="min-w-[90px] md:min-w-[120px]"
              size="lg"
            >
              {practiceEdit ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
