import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Chip,
} from "@nextui-org/react";

export default function ModalDetailHistoryExamQuestion({
  openModal,
  data,
  setOpenModal,
}: any) {
  if (!data || !data.answer) {
    return (
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-between items-center w-full">
                  <span className="text-lg font-bold">Lỗi</span>
                </div>
              </ModalHeader>
              <ModalBody className="py-6">
                <div className="text-center text-danger">
                  <p>Không thể tải dữ liệu bài thi.</p>
                  <p>Vui lòng thử lại sau.</p>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  const renderMobileCard = (item: any, index: number) => (
    <Card className="mb-4 sm:hidden">
      <CardBody>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">STT:</span>
            <span>{index + 1}</span>
          </div>
          <div>
            <span className="font-medium">Câu hỏi:</span>
            <p className="mt-1 text-sm break-words">
              {item.questions || "Không có nội dung"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Đáp án:</span>
            <span className="font-medium">{item.results}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Đáp án của sinh viên:</span>
            <span>{item.answer_user || "Chưa trả lời"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Trạng thái:</span>
            <Chip className="capitalize" size="sm" variant="flat">
              {item.results === item.answer_user ? "✔️" : "❌"}
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      size="4xl"
      scrollBehavior="inside"
      classNames={{
        backdrop: "bg-black/60 backdrop-blur-sm",
        base: "mx-2",
      }}
    >
      <ModalContent className="h-full">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center w-full">
                <span className="text-lg sm:text-xl font-bold">
                  Chi tiết bài thi
                </span>
              </div>
            </ModalHeader>

            <ModalBody className="pb-6">
              {/* Student Info - Simplified for mobile */}
              <div className="px-4 py-3 bg-white rounded-lg shadow-sm space-y-2">
                <div className="flex gap-2">
                  <span className="font-medium">Sinh viên:</span>
                  <span>{data.username || "Không có thông tin"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">Mã sinh viên:</span>
                  <span>{data.msv || "Không có thông tin"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">Môn Thi:</span>
                  <span>{data.subject || "Không có thông tin"}</span>
                </div>
              </div>

              {/* Error Notice if needed */}
              {data.hasError && (
                <div className="mt-4 p-3 bg-danger-50 rounded-lg">
                  <p className="text-danger text-center">
                    Có lỗi xảy ra khi tải một số dữ liệu. Vui lòng thử lại sau.
                  </p>
                </div>
              )}

              {/* Mobile View */}
              <div className="mt-6">
                {data.answer.map((item: any, index: number) =>
                  renderMobileCard(item, index)
                )}
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block mt-6">
                <Table
                  aria-label="Chi tiết bài thi"
                  classNames={{
                    wrapper: "shadow-none",
                  }}
                >
                  <TableHeader>
                    <TableColumn className="text-center w-20">STT</TableColumn>
                    <TableColumn className="text-left">Câu hỏi</TableColumn>
                    <TableColumn className="text-center w-28">
                      Đáp án
                    </TableColumn>
                    <TableColumn className="text-center w-40">
                      Đáp án của sinh viên
                    </TableColumn>
                    <TableColumn className="text-center w-28">
                      Trạng thái
                    </TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="Không có dữ liệu">
                    {data.answer.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        className={`${
                          item.results === item.answer_user
                            ? "bg-success-50"
                            : "bg-danger-50"
                        }`}
                      >
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="break-words">
                          {item.questions || "Không có nội dung"}
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {item.results}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.answer_user || "Chưa trả lời"}
                        </TableCell>
                        <TableCell className="text-center ">
                          <Chip className="capitalize" size="sm" variant="flat">
                            {item.results === item.answer_user ? "✔️" : "❌"}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
