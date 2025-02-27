import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  RadioGroup,
  Radio,
  Button,
  Chip,
} from "@nextui-org/react";
import Number from "./Number";
import Time from "./Time";
import { questionStore } from "@/app/store";

interface Question {
  id: number;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  results: string;
}

interface ExamData {
  id: number;
  subject: string;
  lecturer: string;
  duration: string;
  point: string;
  status_exam: boolean;
  question: Question[];
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface DetailPracticeProps {
  data: ExamData | null;
  runtime?: number;
}

const Detail_Practice: React.FC<DetailPracticeProps> = ({ data, runtime }) => {
  const { setQuestion } = questionStore();
  const [numberQuestion, setNumberQuestion] = useState(1);
  const [_time, _setTime] = useState<number>(() => {
    const savedTime = sessionStorage.getItem("time_exam");
    if (savedTime) {
      return parseInt(savedTime);
    }
    return runtime || 900;
  });
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>(JSON.parse(sessionStorage.getItem("selectedAnswers") || "{}"));

  useEffect(() => {
    if (!sessionStorage.getItem("time_exam") && runtime) {
      _setTime(runtime);
      sessionStorage.setItem("time_exam", runtime.toString());
    }
  }, [runtime]);

  useEffect(() => {
    setQuestion(data);
  }, [data]);

  const questions = data?.question || [];
  const currentQuestion = questions[numberQuestion - 1] || {};

  const handleAnswerChange = (value: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    sessionStorage.setItem(
      "selectedAnswers",
      JSON.stringify({
        ...selectedAnswers,
        [currentQuestion.id]: value,
      })
    );
  };

  return (
    <div className="min-h-screen bg-background pt-[7rem] px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col bg-blue-500 rounded-lg p-4">
            <h1 className="text-2xl font-bold text-white ">{data?.subject}</h1>

            <div className="flex items-center gap-4 text-sm text-white mt-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>Giảng viên: {data?.lecturer}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>{data?.duration} phút</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Enhanced Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-white shadow-sm border border-gray-100">
                <CardBody className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Câu hỏi {numberQuestion} :
                    </h2>
                  </div>

                  <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                    {currentQuestion.question}
                  </p>

                  <RadioGroup
                    value={selectedAnswers[currentQuestion.id] || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-4"
                  >
                    {["A", "B", "C", "D"].map((option) => (
                      <Radio
                        key={option}
                        value={option}
                        description={
                          currentQuestion[`answer${option}` as keyof Question]
                        }
                        classNames={{
                          base: "max-w-full p-4 hover:bg-gray-50 transition-all duration-150 rounded-xl",
                          wrapper: "group-data-[selected=true]:border-primary",
                          label: "text-gray-700 font-medium text-lg",
                          description: "text-gray-800 mt-1 text-md",
                        }}
                      ></Radio>
                    ))}
                  </RadioGroup>

                  <div className="flex justify-between mt-10  ">
                    <Button
                      variant="bordered"
                      color="primary"
                      onPress={() =>
                        setNumberQuestion(Math.max(1, numberQuestion - 1))
                      }
                      isDisabled={numberQuestion === 1}
                      className={`min-w-[140px] h-12 text-lg ${
                        numberQuestion === 1
                          ? "invisible"
                          : "bg-primary text-white cursor-pointer bg-gray-500 border-gray-500"
                      }`}
                    >
                      Câu trước
                    </Button>
                    <Button
                      color="primary"
                      onPress={() =>
                        setNumberQuestion(
                          Math.min(questions.length, numberQuestion + 1)
                        )
                      }
                      isDisabled={numberQuestion === questions.length}
                      className={`min-w-[140px] h-12 text-lg ${
                        numberQuestion === questions.length
                          ? "invisible"
                          : "bg-primary text-white cursor-pointer"
                      }`}
                    >
                      Câu tiếp theo
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                <Card className="bg-white shadow-sm border border-gray-100">
                  <CardBody className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Thời gian còn lại :
                      </h3>
                    </div>
                    <Time _setTime={_setTime} _time={_time} />
                  </CardBody>
                </Card>

                <Card className="bg-white shadow-sm border border-gray-100">
                  <CardBody className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Danh sách câu hỏi
                      </h3>
                    </div>
                    <Number
                      data={questions}
                      question={numberQuestion}
                      setQuestion={setNumberQuestion}
                      _time={_time}
                    />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail_Practice;
