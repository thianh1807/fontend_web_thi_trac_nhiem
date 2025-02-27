"use client";
import { Check } from "lucide-react";
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDetailExam } from "@/app/service/examquestion";
import { useStore } from "@/app/store";
import Error from "@/app/_components/ui/Error";
import { getPracticeDetail } from "@/app/service/practice_api";
import { toast } from "react-toastify";

export default function ExamResults() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const { dataUsers } = useStore();
  const selectedAnswers = JSON.parse(
    sessionStorage.getItem("selectedAnswers") || "{}"
  );
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAnswers || Object.keys(selectedAnswers).length === 0) {
        setIsError(true);
        return;
      }

      const id = params.slug?.[2];

      if (!id) {
        setIsError(true);
        return;
      }

      if (params.slug?.[0] === "practice") {
        const dataPractice = await getPracticeDetail(id);
        if (!dataPractice.data) {
          setIsError(true);
          return;
        }
        setData(dataPractice.data);
        calculateResults(dataPractice.data);
      } else if (params.slug?.[0] === "exam") {
        const dataExam = await getDetailExam(id);
        setData(dataExam.data);
        calculateResults(dataExam.data);
      } else {
        return <Error />;
      }
    };
    fetchData();
  }, [dataUsers, params.slug]);

  // xử lý kết quả bài thi
  const calculateResults = (examData: any) => {
    let correct = 0;
    examData.question.forEach((question: any) => {
      const questionId = question.id;
      if (selectedAnswers[questionId] === question.results) {
        correct++;
      }
    });

    const totalScore = (correct / examData.question.length) * examData.point;
    setCorrectAnswers(correct);
    setScore(Number(totalScore.toFixed(1)));
  };

  // xử lý xem đáp án
  const handleSeeExamResults = () => {
    if (params.slug?.[0] === "practice") {
      router.push(
        `/detail_results_question/${params.slug?.[0]}/${params.slug?.[1]}/${params.slug?.[2]}`
      );
    } else if (params.slug?.[0] === "exam") {
      router.push(
        `/detail_results_question/${params.slug?.[0]}/${params.slug?.[1]}/${params.slug?.[2]}`
      );
    }
  };

  // xử lý lỗi
  if (isError || params.slug?.length !== 3) return <Error />;

  return (
    <div className="min-h-screen pt-[13rem] bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="shadow-lg">
          {/* Success Header Section */}
          <CardBody className="bg-gradient-to-r from-green-50 to-green-100 p-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </div>
              <h1 className="mt-6 text-2xl font-bold text-green-700">
                Nộp bài thành công!
              </h1>
              <p className="mt-2 text-green-600">
                Chúc mừng bạn đã hoàn thành bài thi
              </p>
            </div>
          </CardBody>

          {/* Results Section */}
          <CardBody className="p-6">
            <Table
              aria-label="Kết quả bài thi"
              classNames={{
                wrapper: "shadow-sm",
                th: "bg-blue-50 text-blue-700",
                td: "text-gray-600",
              }}
            >
              <TableHeader>
                <TableColumn className="font-semibold text-lg">
                  Thông tin
                </TableColumn>
                <TableColumn className="font-semibold text-lg">
                  Chi tiết
                </TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell className="font-medium">Tên Sinh Viên</TableCell>
                  <TableCell className="font-semibold">
                    {dataUsers?.username}
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell className="font-medium">Môn học </TableCell>
                  <TableCell className="font-semibold">
                    {data?.subject}
                  </TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell className="font-medium">
                    Thời gian làm bài
                  </TableCell>
                  <TableCell className="font-semibold">
                    {data?.duration} phút
                  </TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell className="font-medium">Số câu đúng</TableCell>
                  <TableCell className="font-semibold">
                    <span className="text-green-600 font-semibold">
                      {correctAnswers}
                    </span>
                    <span className="text-gray-700">
                      /{data?.question?.length} câu
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell className="font-medium">Điểm số</TableCell>
                  <TableCell className="font-semibold">
                    <span className="text-green-600 font-semibold">
                      {score}
                    </span>
                    <span className="text-gray-700">/{data?.point}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Actions Section */}
            <div className="mt-6 flex justify-center gap-4">
              {(params.slug?.[0] === "practice" || data?.see_exam_results) && (
                <Button
                  color="primary"
                  size="lg"
                  className="font-semibold"
                  onClick={handleSeeExamResults}
                >
                  Xem đáp án
                </Button>
              )}
              <Button
                variant="bordered"
                size="lg"
                className="text-blue-600 border-blue-200 font-semibold"
                onClick={() => {
                  router.replace("/");
                  sessionStorage.removeItem("selectedAnswers");
                }}
              >
                Quay lại trang chủ
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
