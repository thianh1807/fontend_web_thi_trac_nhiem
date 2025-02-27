import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

interface ExamTableProps {
  data: any[];
  setOpenModal: (value: any) => void;
  setDataQuestion: (value: any) => void;
}

const ExamTable = ({ data, setOpenModal, setDataQuestion }: ExamTableProps) => {
  // handle open modal
  const handleOpenModal = (data: any) => {
    setOpenModal((prev: any) => !prev);
    setDataQuestion(data);
  };

  return (
    <Table aria-label="Danh sách bài thi">
      <TableHeader>
        <TableColumn className="text-center">STT</TableColumn>
        <TableColumn className="text-center">MÔN HỌC</TableColumn>
        <TableColumn className="text-center">GIẢNG VIÊN</TableColumn>
        <TableColumn className="text-center">SINH VIÊN</TableColumn>
        <TableColumn className="text-center">MÃ SINH VIÊN</TableColumn>
        <TableColumn className="text-center">LỚP</TableColumn>
        <TableColumn className="text-center">THỜI GIAN NỘP BÀI</TableColumn>
        <TableColumn className="text-center">THỜI LƯỢNG</TableColumn>
        <TableColumn className="text-center">ĐIỂM</TableColumn>
        <TableColumn className="text-center">HÀNH ĐỘNG</TableColumn>
      </TableHeader>
      <TableBody>
        {data?.length === 0 ? (
          <TableRow>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">Không có dữ liệu</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">-</TableCell>
            <TableCell className="text-center">-</TableCell>
          </TableRow>
        ) : (
          data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{item?.subject}</TableCell>
              <TableCell className="text-center">
                {item?.namelecturer}
              </TableCell>
              <TableCell className="text-center">{item?.username}</TableCell>
              <TableCell className="text-center">{item?.msv}</TableCell>
              <TableCell className="text-center">{item?.class}</TableCell>
              <TableCell className="text-center">
                {new Date(item?.exam_day).toLocaleString("vi-VN")}
              </TableCell>
              <TableCell className="text-center">
                {item?.duration} phút
              </TableCell>
              <TableCell className="text-center ">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  {item.calculatedPoint} / {item.point}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex gap-2 items-center justify-center">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => handleOpenModal(item)}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ExamTable;
