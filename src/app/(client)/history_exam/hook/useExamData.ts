import { useState, useCallback, useEffect } from "react";
import { getHistoryExam } from "@/app/service/history_api";

interface Answer {
  id: number;
  questions: string;
  results: string;
  answer_user: string;
}

interface ExamData {
  filteredData: any[];
  page: number;
  setPage: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalPages: number;
  dateRange: {
    start: string;
    end: string;
  };
  handleDateRangeChange: (newRange: any) => void;
}

export function useExamData(dataUsers: any): ExamData {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>(
    () => {
      // Giá trị mặc định
      const defaultRange = {
        start: new Date().toISOString().split("T")[0],
        end: new Date().toISOString().split("T")[0],
      };

      // Chỉ truy cập localStorage ở phía client
      if (typeof window !== "undefined") {
        try {
          const savedRange = localStorage.getItem("examDateRange");
          if (savedRange) {
            return JSON.parse(savedRange);
          }
        } catch (error) {
          console.error("Error reading from localStorage:", error);
        }
      }

      return defaultRange;
    }
  );

  // Calculate points based on answers
  const calculatePoints = (answers: Answer[]) => {
    if (!answers || answers.length === 0) return 0;

    const correctAnswers = answers.filter(
      (answer) => answer.results === answer.answer_user
    );
    const pointPerQuestion = 10 / answers.length; // Total points is 10
    return (correctAnswers.length * pointPerQuestion).toFixed(1);
  };

  const fetchData = useCallback(async () => {
    if (dataUsers.role_user !== "lecturer") {
      return null;
    }

    try {
      const response = await getHistoryExam(
        page,
        searchTerm,
        dataUsers.information_teacher.mgv
      );

      // Process the data to include calculated points
      const processedData = (response.data || []).map((item: any) => ({
        ...item,
        calculatedPoint: calculatePoints(item.answer),
      }));

      setData(processedData);
      setTotalPages(response.meta.pagination.pageCount);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }, [page, searchTerm, dataUsers]);

  useEffect(() => {
    if (!data.length || !dateRange.start || !dateRange.end) {
      setFilteredData(data);
      return;
    }

    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    const filtered = data.filter((item: any) => {
      const examDate = new Date(item.exam_day);
      return examDate >= startDate && examDate <= endDate;
    });

    setFilteredData(filtered);
  }, [data, dateRange]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [fetchData]);

  const handleDateRangeChange = (newRange: any) => {
    const formattedRange = {
      start: newRange.start.toDate("UTC").toISOString().split("T")[0],
      end: newRange.end.toDate("UTC").toISOString().split("T")[0],
    };

    setDateRange(formattedRange);
    // Chỉ lưu vào localStorage ở phía client
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("examDateRange", JSON.stringify(formattedRange));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  };

  return {
    filteredData,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    totalPages,
    dateRange,
    handleDateRangeChange,
  };
}
