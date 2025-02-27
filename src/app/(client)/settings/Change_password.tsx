"use client";
import React, { useState } from "react";
import Input from "@/app/_components/common/Input";
import Icon from "@/app/_components/common/Icon";
import { changePassword } from "@/app/service/change_pass_api";
import { deleteCookie, setCookie } from "cookies-next";
import { toast } from "react-toastify";
export default function Change_password() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    toast.dismiss();

    if (!confirm("Bạn có chắc là muốn đổi mật khẩu ?")) return;

    if (newPassword !== confirmPassword) toast.error("Mật khẩu mới không khớp");

    // gọi api đổi mật khẩu
    const data = await changePassword(
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (data?.error?.message) {
      toast.error(
        data.error.message
          .replace(
            "The provided current password is invalid",
            "Mật khẩu cũ không chính xác !"
          )
          .replace(
            "Your new password must be different than your current password",
            "Mật khẩu mới của bạn phải khác với mật khẩu hiện tại của bạn"
          )
          .replace(
            "Too many requests, please try again later.",
            "Quá nhiều yêu cầu, vui lòng thử lại sau."
          )
          .replace("3 errors occurred", "Bạn đang để trống 3 trường")
          .replace("2 errors occurred", "Bạn đang để trống 2 trường")
          .replace("1 errors occurred", "Bạn đang để trống 1 trường")
      );
    }
    if (data?.jwt) {
      deleteCookie("jwt");
      setCookie("jwwt", data.jwt, { maxAge: 60 * 60 * 24 });
      toast.success("Đổi mật khẩu thành công !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div className="flex flex-col gap-6 shadow-sm border border-gray-100 rounded-lg p-6">
      <div>
        <div className="flex items-center gap-2">
          <Icon icon="KeySquare" className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Đổi mật khẩu</h2>
        </div>
        <p className="text-gray-500 flex items-center gap-2 mt-2">
          <Icon icon="ShieldEllipsisIcon" className="text-gray-400" />
          Vui lòng nhập mật khẩu hiện tại và mật khẩu mới của bạn
        </p>
      </div>
      <Input
        placeholder="Nhập mật khẩu hiện tại"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e)}
        type="password"
        label="Mật khẩu hiện tại"
        icon={"LockIcon"}
      />
      <Input
        placeholder="Nhập mật khẩu mới"
        value={newPassword}
        onChange={(e) => setNewPassword(e)}
        type="password"
        label="Mật khẩu mới"
        icon={"LockIcon"}
      />
      <Input
        placeholder="Xác nhận mật khẩu mới"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e)}
        type="password"
        label="Xác nhận mật khẩu mới"
        icon={"LockIcon"}
      />
      <button
        className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors mt-2"
        onClick={handleChangePassword}
      >
        Cập nhật mật khẩu
      </button>
    </div>
  );
}
