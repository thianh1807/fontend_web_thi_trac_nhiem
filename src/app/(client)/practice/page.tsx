"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Chip,
  Divider,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import {
  SearchIcon,
  BookOpenIcon,
  ClockIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react";
import { getPracticePage } from "@/app/service/practice_api";
import NextPagination from "@/app/_components/ui/Pagination";

interface Subject {
  id: number;
  subject: string;
  duration: number;
  point: number;
  documentId: string;
  status_exam: boolean;
  lecturer: string;
  createdAt: string;
  question: any[];
}

export default function PracticePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [practicePage, setPracticePage] = useState<Subject[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const handleClick = (subject: Subject, documentId: string) => {
    const formattedName = subject.subject
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/\s+/g, "_")
      .toLowerCase();
    router.push(`/practice/${formattedName}/${documentId}`);
  };

  useEffect(() => {
    sessionStorage.removeItem("selectedAnswers");
    sessionStorage.removeItem("time_exam");
    const fetchData = async () => {
      try {
        const response = await getPracticePage(page, searchTerm);
        setPracticePage(response.data);
        setTotalPages(response.meta.pagination.pageCount);
      } catch (error) {
        console.error("Error fetching practice page:", error);
      }
    };
    fetchData();
  }, [page, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-16 pt-[10rem]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 mb-4">
            Luyện Thi Thử
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kho đề thi và bài tập các môn học bậc đại học được biên soạn bởi các
            giảng viên có kinh nghiệm
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <Input
            isClearable
            type="text"
            placeholder="Tìm kiếm môn học..."
            startContent={<SearchIcon className="text-default-400" />}
            value={searchTerm}
            onClear={() => setSearchTerm("")}
            onChange={(e) => setSearchTerm(e.target.value)}
            classNames={{
              inputWrapper: "shadow-md hover:shadow-lg transition-shadow",
            }}
            size="lg"
          />
        </div>

        {practicePage.length === 0 ? (
          <div className="text-center text-gray-500">Không có dữ liệu</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practicePage.map((subject, index) => {
                if (subject.status_exam) return null;
                return (
                  <Card
                    key={index}
                    isPressable
                    className="border-none shadow-md hover:shadow-xl transition-shadow"
                  >
                    <CardHeader className="flex gap-3">
                      <Avatar
                        icon={<BookOpenIcon />}
                        classNames={{
                          base: "bg-gradient-to-br from-blue-500 to-violet-500",
                          icon: "text-white",
                        }}
                      />
                      <div className="flex flex-col">
                        <p className="text-lg font-bold">{subject.subject}</p>
                        <p className="text-small text-default-500">
                          {subject.question.length} câu hỏi
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody className="py-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Tooltip content="Thời gian làm bài">
                            <Chip
                              startContent={<ClockIcon className="w-4 h-4" />}
                              variant="flat"
                              color="primary"
                              size="sm"
                            >
                              {subject.duration} phút
                            </Chip>
                          </Tooltip>
                          <Tooltip content="Điểm tối đa">
                            <Chip
                              startContent={<StarIcon className="w-4 h-4" />}
                              variant="flat"
                              color="warning"
                              size="sm"
                            >
                              {subject.point} điểm
                            </Chip>
                          </Tooltip>
                        </div>
                        <div className="flex items-center gap-2 text-small text-default-500">
                          <UserIcon className="w-4 h-4" />
                          {subject.lecturer}
                        </div>
                        <div className="flex items-center gap-2 text-small text-default-500">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(subject.createdAt)}
                        </div>
                      </div>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <Button
                        fullWidth
                        color="primary"
                        variant="shadow"
                        onPress={() =>
                          handleClick(subject, subject?.documentId)
                        }
                      >
                        Bắt đầu làm bài
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center mt-12">
              <NextPagination
                total={totalPages}
                setPage={setPage}
                page={page}
                url="/practice"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
