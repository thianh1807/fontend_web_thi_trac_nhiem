"use client";
import Detail_Practice from "@/app/_components/common/detail_question/Detail_Practice";
import { getDetailExam } from "@/app/service/examquestion";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function page() {
  const [data, setData] = useState<any>(null);
  const [runtime, setRuntime] = useState<number>(0);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.slug?.[1]) return;

      const data = await getDetailExam(params.slug[1]);
      if (
        data.data.subject
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[đĐ]/g, "d")
          .replace(/\s+/g, "_")
          .toLowerCase() !== params.slug[0]
      ) {
        toast.error("Đã có lỗi xảy ra");
        return;
      }

      setData(data.data);
      setRuntime(data.data.duration * 60 || 900); // 15 default mins in seconds
    };
    fetchData();
  }, [params.slug]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Detail_Practice data={data} runtime={runtime} />
    </div>
  );
}
