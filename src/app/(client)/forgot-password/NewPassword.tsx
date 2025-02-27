"use client";
import Input from "@/app/_components/common/Input";
import React, { useState } from "react";
export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div>
      <Input
        placeholder="Nhập mật khẩu mới"
        value={password}
        onChange={(e) => setPassword(e)}
        type="password"
        label="Mật khẩu mới"
      />
      <Input
        placeholder="Nhập lại mật khẩu"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e)}
        type="password"
        label="Nhập lại mật khẩu"
      />
      <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors mt-6">
        Xác nhận
      </button>
    </div>
  );
}
