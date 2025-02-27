"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDetailExam } from "@/app/service/examquestion";
import {
  RadioGroup,
  Radio,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import Error from "@/app/_components/ui/Error";
import { getPracticeDetail } from "@/app/service/practice_api";

export default function DetailResultsQuestion() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const selectedAnswers = JSON.parse(
    sessionStorage.getItem("selectedAnswers") || "{}"
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAnswers || Object.keys(selectedAnswers).length === 0) {
        setIsError(true);
      } else {
        if (params.slug?.[0] === "practice") {
          const data = await getPracticeDetail(params.slug?.[2]);

          setData(data.data);
        } else {
          const data = await getDetailExam(params.slug?.[2]);
          setData(data.data);
        }
      }
    };

    fetchData();
  }, [params.slug]);

  if (
    isError ||
    params.slug?.length !== 3 ||
    (params.slug?.[0] !== "practice" && !data?.see_exam_results)
  )
    return <Error />;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 pt-[8rem]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Kết Quả Bài Thi
          </h1>
        </div>

        {data?.question.map((question: any, index: number) => (
          <Card
            key={index}
            className="mb-4 shadow-md hover:shadow-lg transition-shadow"
            isPressable={false}
          >
            <CardHeader className="bg-blue-50 p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Câu hỏi {index + 1}
              </h2>
            </CardHeader>
            <CardBody className="p-4">
              <p className="text-gray-700 mb-4">{question.question}</p>
              <RadioGroup
                value={selectedAnswers[question.id]}
                className="flex flex-col gap-2"
                isReadOnly
              >
                {["A", "B", "C", "D"].map((option) => (
                  <Radio
                    key={option}
                    value={option}
                    className={question.results === option ? "font-bold" : ""}
                  >
                    {question[`answer${option}`]}
                  </Radio>
                ))}
              </RadioGroup>
            </CardBody>
          </Card>
        ))}

        <div className="flex justify-center mt-6">
          <button
            onClick={() =>
              params.slug?.[0] !== "practice"
                ? router.replace("/exam")
                : router.replace("/practice")
            }
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
