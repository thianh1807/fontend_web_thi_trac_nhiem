import React from "react";
import { Plus, Trash2 } from "lucide-react";

export interface Question {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  results: string;
}

interface QuestionFormProps {
  questions: Question[];
  handleQuestionChange: (index: number, field: string, value: string) => void;
  addQuestion: () => void;
  removeQuestion: (index: number) => void;
  errors: { [key: string]: string };
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  questions,
  handleQuestionChange,
  addQuestion,
  removeQuestion,
  errors,
}) => {
  return (
    <>
      <div className="border-[1px] border-gray-200 mb-4 md:hidden"></div>
      <div className="md:p-6 overflow-y-auto bg-gray-50 h-[calc(90vh-200px)]">
        <div className="sticky top-[-1.5rem] z-10 bg-gray-50 flex flex-col md:flex-row justify-between items-center pb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 pb-2">
            Danh sách câu hỏi
          </h3>
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium md:text-lg text-sm">
              Thêm câu hỏi mới
            </span>
          </button>
        </div>

        {questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg font-medium">
              Chưa có câu hỏi nào
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Vui lòng thêm câu hỏi mới
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {questions.map((question: Question, index: number) => (
              <div
                key={index}
                className="p-4 md:p-8 bg-white border border-gray-200 rounded-2xl shadow-md relative hover:shadow-lg transition-shadow w-full"
              >
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="absolute top-2 right-2 md:top-6 md:right-6 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2 md:space-y-3">
                    <label className="block text-sm md:text-base font-semibold text-gray-800">
                      Câu hỏi {index + 1}
                    </label>
                    <textarea
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(index, "question", e.target.value)
                      }
                      className={`w-full h-[100px] md:h-[120px] p-3 md:p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base ${
                        !question.question && errors[`question_${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Nhập nội dung câu hỏi..."
                    />
                    {!question.question && errors[`question_${index}`] && (
                      <p className="text-red-500 text-sm">
                        Vui lòng nhập câu hỏi
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {["A", "B", "C", "D"].map((option) => (
                      <div key={option} className="space-y-2 md:space-y-3">
                        <label className="block text-sm md:text-base font-semibold text-gray-800">
                          Đáp án {option}
                        </label>
                        <input
                          type="text"
                          value={question[`answer${option}` as keyof Question]}
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              `answer${option}`,
                              e.target.value
                            )
                          }
                          className={`w-full p-3 md:p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base ${
                            !question[`answer${option}` as keyof Question] &&
                            errors[`question_${index}`]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder={`Nhập đáp án ${option}...`}
                        />
                        {!question[`answer${option}` as keyof Question] &&
                          errors[`question_${index}`] && (
                            <p className="text-red-500 text-sm">
                              Vui lòng nhập đáp án {option}
                            </p>
                          )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 md:space-y-3">
                    <label className="block text-sm md:text-base font-semibold text-gray-800">
                      Đáp án chính xác
                    </label>
                    <select
                      value={question.results}
                      onChange={(e) =>
                        handleQuestionChange(index, "results", e.target.value)
                      }
                      className={`w-full p-3 md:p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base bg-white ${
                        !question.results && errors[`question_${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">-- Chọn đáp án đúng --</option>
                      {["A", "B", "C", "D"].map((option) => (
                        <option key={option} value={option}>
                          Đáp án {option}
                        </option>
                      ))}
                    </select>
                    {!question.results && errors[`question_${index}`] && (
                      <p className="text-red-500 text-sm">
                        Vui lòng chọn đáp án đúng
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionForm;
