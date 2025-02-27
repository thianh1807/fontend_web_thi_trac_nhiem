"use client";
import React, { useState } from "react";
import { useStore } from "@/app/store";
import Error from "@/app/_components/ui/Error";
import NextPagination from "@/app/_components/ui/Pagination";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ExamTable from "./ExamTable";
import { useExamData } from "./hook/useExamData";
import ModalDetailHistoryExamQuestion from "./ModalDetailHistoryExamQuestion";

export default function ExamList() {
  const { dataUsers } = useStore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataQuestion, setDataQuestion] = useState<any>({});

  const {
    filteredData,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    totalPages,
    dateRange,
    handleDateRangeChange,
  } = useExamData(dataUsers);

  if (dataUsers.role_user !== "lecturer") {
    return <Error />;
  }

  return (
    <div className="pt-[7rem] min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg w-[90%] mx-auto p-6">
        <Header />
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateRange={dateRange}
          onDateChange={handleDateRangeChange}
        />
        <ExamTable
          data={filteredData}
          setOpenModal={setOpenModal}
          setDataQuestion={setDataQuestion}
        />
        <NextPagination
          page={page}
          total={totalPages}
          setPage={setPage}
          url="/history_exam"
        />
        <ModalDetailHistoryExamQuestion
          openModal={openModal}
          data={dataQuestion}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  );
}
