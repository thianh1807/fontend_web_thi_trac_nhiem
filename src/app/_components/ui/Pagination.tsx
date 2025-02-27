"use client";
import React from "react";
import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function NextPagination({
  total,
  setPage,
  page,
  url,
}: {
  total: number;
  setPage: (page: number) => void;
  page: number;
  url: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("page");

  if (total <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-5 mt-16">
      <div className="flex flex-col gap-5">
        <Pagination
          color="primary"
          page={Number(searchTerm) || page}
          total={total}
          onChange={(page) => {
            setPage(Number(searchTerm) || page);
            router.push(`${url}?page=${page}`);
          }}
        />
      </div>
    </div>
  );
}
