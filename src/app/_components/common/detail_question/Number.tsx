"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { questionStore, useStore } from "@/app/store";
import { toast } from "react-toastify";
import { setHistoryExam } from "@/app/service/history_api";

export default function Number({
  question,
  setQuestion,
  data,
  _time,
}: {
  question: number;
  setQuestion: (question: number) => void;
  data: any;
  _time: number;
}) {
  const { dataQuestion } = questionStore();
  const { dataUsers } = useStore();
  const [answered, setAnswered] = useState<any>({});
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  useEffect(() => {
    const savedAnswers = sessionStorage.getItem("selectedAnswers");
    if (savedAnswers) {
      setAnswered(JSON.parse(savedAnswers));
    }
  }, [sessionStorage.getItem("selectedAnswers")]);

  // nộp bài khi hết thời gian
  useEffect(() => {
    if (_time === 0) {
      alert("Bạn đã hết thời gian làm bài");
      requestSubmit();
    }
  }, [_time]);

  // nộp bài
  const handleSubmit = () => {
    if (Object.keys(answered).length !== data.length) {
      alert("Vui lòng trả lời tất cả câu hỏi");
      return;
    }

    if (confirm("Bạn có chắc chắn muốn nộp bài?")) {
      requestSubmit();
    }
  };
  // xử lý gửi api nộp bài
  const requestSubmit = async () => {
    toast.dismiss();
    sessionStorage.removeItem("time_exam");

    if (pathname.split("/")[1] === "exam") {
      const selectedAnswers = data.map((item: any) => {
        return {
          questions: item.question,
          results: item.results,
          answer_user: answered[item.id],
        };
      });
      const result = await setHistoryExam(
        dataUsers,
        dataQuestion,
        selectedAnswers
      );
      if (result.error) {
        toast.error("Đã có lỗi xảy ra !");
      } else {
        router.replace(
          `/results/${pathname.split("/")[1]}/${params.slug?.[0]}/${
            params.slug?.[1]
          }`
        );
      }
    } else if (pathname.split("/")[1] === "practice") {
      router.replace(
        `/results/${pathname.split("/")[1]}/${params.slug?.[0]}/${
          params.slug?.[1]
        }`
      );
    } else {
      toast.error("Đã có lỗi xảy ra !");
    }
  };

  // hiện thị các câu hỏi
  return (
    <>
      <div className="grid grid-cols-6 gap-2">
        {data.map((item: any, index: number) => (
          <button
            key={index + 1}
            className={`flex items-center justify-center w-9 h-9 text-md rounded-full transition-colors
              ${
                index + 1 === question
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : Object.keys(answered).includes(item.id.toString())
                  ? "bg-gray-400 text-white hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }
            `}
            onClick={() => setQuestion(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className={`w-full  text-white rounded-xl py-3 font-medium  transition-colors mt-6
          ${
            Object.keys(answered).length !== data.length
              ? "cursor-not-allowed bg-gray-400 text-gray-700"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
        onClick={handleSubmit}
        disabled={Object.keys(answered).length !== data.length}
      >
        Nộp bài
      </button>
    </>
  );
}
