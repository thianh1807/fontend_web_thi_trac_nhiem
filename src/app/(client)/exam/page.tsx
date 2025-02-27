"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { SearchIcon } from "@nextui-org/shared-icons";
import { getItemExam } from "@/app/service/exams_api";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
export default function ExamPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  let count = 0;
  const { dataUsers } = useStore();
  const router = useRouter();

  useEffect(() => {
    sessionStorage.removeItem("selectedAnswers");
    sessionStorage.removeItem("time_exam");

    const fetchData = async () => {
      const data = await getItemExam(
        null,
        "",
        dataUsers.information_user.class.trim().toUpperCase()
      );

      const examData = data?.data.map((exam: any) => {
        const now = new Date();
        const examDate = new Date(exam.exam_day);
        const closeDate = new Date(exam.day_close);
        let status = "closed";
        if (now < examDate) {
          status = "upcoming";
        } else if (now >= examDate && now <= closeDate) {
          status = "open";
        }
        return {
          ...exam,
          status_exam: status,
        };
      });

      setExams(examData);
    };
    fetchData();
  }, [dataUsers]);

  const filteredExams =
    exams?.filter((exam) =>
      Object.values(exam).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) || [];

  const columns = [
    { name: "STT", uid: "documentId" },
    { name: "MÔN HỌC", uid: "subject" },
    { name: "GIẢNG VIÊN", uid: "lecturer" },
    { name: "LỚP", uid: "class" },
    { name: "NGÀY THI", uid: "exam_day" },
    { name: "NGÀY ĐÓNG", uid: "day_close" },
    { name: "THỜI LƯỢNG", uid: "duration" },
    { name: "ĐIỂM", uid: "point" },
    { name: "TRẠNG THÁI", uid: "status_exam" },
    { name: "HÀNH ĐỘNG", uid: "actions" },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "open":
        return "success";
      case "upcoming":
        return "warning";
      case "closed":
        return "default";
      default:
        return "default";
    }
  };

  const handleStartExam = (examId: any, subject: string) => {
    // xử lý logic với examId và subject
    const formattedName = subject
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/\s+/g, "_")
      .toLowerCase();
    router.push(`/exam/${formattedName}/${examId}`);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (seconds: string) => {
    return `${seconds} phút`;
  };

  return (
    <div className="p-8 mt-[5rem]">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col gap-2 bg-blue-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between w-full px-4 py-2">
            <div>
              <h1 className="text-3xl font-bold">Danh sách bài thi</h1>
              <p className="text-white/80 mt-1">
                Xem thông tin chi tiết về các bài thi sắp tới
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Chip color="success" variant="shadow">
                Đang mở:{" "}
                {exams?.filter((e) => e.status_exam === "open").length || 0}
              </Chip>
              <Chip color="warning" variant="shadow">
                Sắp diễn ra:{" "}
                {exams?.filter((e) => e.status_exam === "upcoming").length || 0}
              </Chip>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-6">
            <Input
              isClearable
              startContent={<SearchIcon className="text-default-300" />}
              placeholder="Tìm kiếm theo môn học, giảng viên, lớp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              size="lg"
              variant="bordered"
            />
          </div>

          <Table
            aria-label="Danh sách bài thi"
            classNames={{
              wrapper: "min-h-[400px]",
              th: "bg-gray-50/50 text-default-700",
              td: "py-4",
            }}
            shadow="none"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} className="text-xs uppercase">
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={filteredExams}>
              {filteredExams.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>

                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p>Không có dữ liệu</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>
                  <TableCell className="text-center">
                    <p>-</p>
                  </TableCell>
                </TableRow>
              ) : (
                (item) => (
                  <TableRow
                    key={item.id}
                    className="cursor-pointer hover:bg-gray-50/50"
                  >
                    <TableCell>
                      <div className="font-medium">{++count}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.subject}</div>
                    </TableCell>
                    <TableCell>{item.lecturer}</TableCell>
                    <TableCell>
                      <Chip size="sm" variant="flat">
                        {item.class.trim().toUpperCase()}
                      </Chip>
                    </TableCell>
                    <TableCell>{formatDate(item.exam_day)}</TableCell>
                    <TableCell>{formatDate(item.day_close)}</TableCell>
                    <TableCell>
                      <Chip size="sm" variant="dot">
                        {formatDuration(item.duration)}
                      </Chip>
                    </TableCell>
                    <TableCell>{item.point}</TableCell>
                    <TableCell>
                      <Chip
                        color={getStatusColor(item.status_exam)}
                        variant="flat"
                        size="sm"
                      >
                        {item.status_exam === "open"
                          ? "Đang mở"
                          : item.status_exam === "upcoming"
                          ? "Sắp diễn ra"
                          : "Đã đóng"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        content={
                          item.status_exam === "open"
                            ? "Bắt đầu làm bài"
                            : "Bài thi chưa được mở"
                        }
                      >
                        <Button
                          color={
                            item.status_exam === "open" ? "primary" : "default"
                          }
                          variant="flat"
                          size="sm"
                          onClick={() =>
                            handleStartExam(item.documentId, item.subject)
                          }
                          disabled={item.status_exam !== "open"}
                        >
                          {item.status_exam === "open" ? "Làm bài" : "Chưa mở"}
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
