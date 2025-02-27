import React from "react";
import { FormData } from "./types";

interface ExamFormProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors: Record<string, string>;
}

const ExamForm: React.FC<ExamFormProps> = ({
  formData,
  handleChange,
  errors,
}) => {
  console.log(formData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(formData).map(([key, value]) => {
        // Bỏ qua trường "magv" nếu có trong formData
        if (
          key === "magv" ||
          key === "publishedAt" ||
          key === "updatedAt" ||
          key === "question" ||
          key === "documentId" ||
          key === "createdAt" ||
          key === "UpdatedAt" ||
          key === "id"
        )
          return null;

        return (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {key === "see_exam_results"
                ? "Xem kết quả bài thi"
                : key === "status_exam"
                ? "Trạng thái kỳ thi"
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {typeof value === "boolean" ? (
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            ) : (
              <input
                type={key.includes("day") ? "datetime-local" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                disabled={key === "lecturer"}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
            {errors[key] && (
              <p className="text-red-500 text-sm">{errors[key]}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExamForm;
