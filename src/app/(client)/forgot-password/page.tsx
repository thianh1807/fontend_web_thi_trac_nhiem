"use client";
import { useState } from "react";
import Input from "@/app/_components/common/Input";
import Link from "next/link";
import Model_OTP from "@/app/_components/common/Model_OTP";
import NewPassword from "./NewPassword";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [valueOtp, setValueOtp] = useState("");
  const [isNewPassword, setIsNewPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isOTP && (
        <Model_OTP
          setValueOtp={setValueOtp}
          valueOtp={valueOtp}
          setIsOTP={setIsOTP}
        />
      )}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Phần bên trái - Hình ảnh */}
        <div className="hidden md:block relative overflow-hidden p-4">
          <img
            className="w-full h-full object-contain m-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_%C4%90%C3%B4ng_%C3%81_2015.png"
            alt="logo"
          />
        </div>
        {/* Phần bên phải - Form quên mật khẩu */}
        <div className="flex flex-col justify-center px-8 py-12 space-y-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-4xl font-bold text-blue-800 mb-6 tracking-tight">
              Quên Mật Khẩu
            </h2>
            <p className="text-center text-gray-500">
              {!isNewPassword
                ? "Vui lòng nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu."
                : "Vui lòng nhập mật khẩu mới của bạn của bạn !"}
            </p>
          </div>
          {isNewPassword ? (
            <NewPassword />
          ) : (
            <form className="space-y-6">
              <Input
                placeholder="Nhập email của trường"
                value={email}
                onChange={(e) => setEmail(e)}
                icon={"Mail"}
                label="Email"
                type="email"
              />

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang xử lý..." : "Gửi yêu cầu"}
                </button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors hover:underline"
                  >
                    Quay lại đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
