"use client";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
  Card,
  CardBody,
  Input,
} from "@nextui-org/react";
import Icon from "@/app/_components/common/Icon";
import NextPagination from "@/app/_components/ui/Pagination";
import { DeletePractice, getPracticePage } from "@/app/service/practice_api";
import { toast } from "react-toastify";
import ModalAddPractice from "./_modal_practice/ModalAddPractice";

function PracticeContent() {
  const [search, setSearch] = useState<any>("");
  const [practices, setPractices] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [refresh, setRefresh] = useState<any>(false);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState<any>(false);

  const [practiceEdit, setPracticeEdit] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await getPracticePage(page, search);
      setPractices(response.data);
      setTotalPage(response.meta.pagination.pageCount);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  }, [page, search, refresh]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [fetchData]);

  const handleDelete = async (id: any) => {
    if (!confirm("Bạn có chắc là muốn xóa bài thi này không !")) return;
    try {
      const data = await DeletePractice(id);

      if (!data.ok) throw new Error("lỗi");
      setRefresh((prev: any) => !prev);
      toast.success("Xóa bài thi thành công !");
    } catch (error) {
      console.error("lỗi xóa");
    }
  };

  const handleEdit = async (_data: any) => {
    setPracticeEdit(_data);
    setIsOpenModalCreate(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-[7rem] from-gray-50 to-gray-100 pb-12 px-4">
      <Card className="max-w-7xl mx-auto shadow-lg">
        <CardBody className="p-6">
          {/* Header Section */}

          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                Quản lý bài thi thử
              </h2>
            </div>
            <div className="flex items-center gap-2 justify-between md:w-[97%] m-auto">
              <Input
                placeholder="Tìm kiếm theo môn thi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                startContent={
                  <Icon icon="Search" className="w-5 h-5 text-gray-400" />
                }
                className="max-w-md"
                size="lg"
              />
              <Button
                color="primary"
                startContent={<Icon icon="Plus" className="w-5 h-5" />}
                className="px-6 py-2 font-semibold shadow-md hover:shadow-lg transition-all lg:mr-10"
                onClick={() => setIsOpenModalCreate(true)}
              >
                Thêm bài thi
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <Table
            aria-label="Danh sách bài thi thử"
            className="mt-4"
            shadow="none"
          >
            <TableHeader>
              <TableColumn className="text-center bg-gray-50 text-sm font-semibold">
                STT
              </TableColumn>
              <TableColumn className="text-center bg-gray-50 text-sm font-semibold">
                GIẢNG VIÊN
              </TableColumn>
              <TableColumn className="text-center bg-gray-50 text-sm font-semibold">
                TÊN BÀI THI
              </TableColumn>
              <TableColumn className="text-center bg-gray-50 text-sm font-semibold">
                THỜI GIAN
              </TableColumn>
              <TableColumn className="text-center bg-gray-50 text-sm font-semibold">
                NGÀY TẠO
              </TableColumn>
              <TableColumn className="text-center bg-gray-50 text-sm font-semibold">
                ĐIỂM
              </TableColumn>
              <TableColumn className="text-center bg-gray-50 text-sm font-semibold">
                TRẠNG THÁI
              </TableColumn>
              <TableColumn className="text-center bg-gray-50 text-sm font-semibold">
                THAO TÁC
              </TableColumn>
            </TableHeader>
            <TableBody>
              {practices.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">
                    Không có dữ liệu bài thi
                  </TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">-</TableCell>
                </TableRow>
              ) : (
                practices.map((practice, index) => (
                  <TableRow key={practice.id} className="hover:bg-gray-50">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center font-medium">
                      {practice.lecturer}
                    </TableCell>
                    <TableCell className="text-center">
                      {practice.subject}
                    </TableCell>
                    <TableCell className="text-center">
                      {practice.duration} phút
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-600">
                      {new Date(practice.createdAt).toLocaleString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {practice.point}
                    </TableCell>
                    <TableCell className="text-center">
                      <Chip
                        color={!practice.status_exam ? "success" : "danger"}
                        variant="flat"
                        size="sm"
                        className="font-medium"
                      >
                        {!practice.status_exam
                          ? "Hoạt động"
                          : "Không hoạt động"}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="flat"
                          size="sm"
                          className="font-medium bg-blue-500 text-white min-w-[80px]"
                          onClick={() => handleEdit(practice)}
                        >
                          Sửa
                        </Button>
                        <Button
                          variant="flat"
                          size="sm"
                          className="font-medium bg-red-500 text-white min-w-[80px]"
                          onClick={() => handleDelete(practice.id)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <ModalAddPractice
        isOpenModalCreate={isOpenModalCreate}
        setIsOpenModalCreate={setIsOpenModalCreate}
        practiceEdit={practiceEdit}
        setPracticeEdit={setPracticeEdit}
        setRefresh={setRefresh}
      />

      <div className="mt-6 flex justify-center">
        <NextPagination
          total={totalPage}
          setPage={setPage}
          page={page}
          url="/add_practice"
        />
      </div>
    </div>
  );
}

export default function PageCreatePractice() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-gray-600">Đang tải...</div>
        </div>
      }
    >
      <PracticeContent />
    </Suspense>
  );
}
