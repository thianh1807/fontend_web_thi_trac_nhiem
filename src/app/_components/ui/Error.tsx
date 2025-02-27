import React from "react";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-[10rem] text-red-500 font-bold mb-10">404</h1>
      <p className="text-6xl">Lỗi không tìm thấy đường dẫn</p>
    </div>
  );
}
