"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

// import thư viện từ bên trong
import Input from "@/app/_components/common/Input";
import { requestLogin } from "@/app/service/login_api";
import { refreshStore } from "@/app/store";

// vần xử lý code
export default function PageLogin() {
  const [email, setEmail] = useState<any>(getCookie("rememberMe") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
    getCookie("rememberMe") ? true : false
  );
  const router = useRouter();
  const { setRefresh } = refreshStore();

  // kiểm tra xem có token không
  useEffect(() => {
    if (getCookie("jwt")) {
      router.push("/");
    }
    if (getCookie("jwt")) {
      deleteCookie("jwt");
    }
  }, []);

  // hàm đăng nhập
  const handleLogin = async (e: any) => {
    e.preventDefault();
    toast.dismiss();

    if (password === "" || email === "") {
      toast.error("Vui lòng nhập đủ thông tin");
      return;
    }
    if (password.length < 6 || password.length > 20) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự và không quá 20 ký tự");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Email không hợp lệ");
      return;
    }

    const data = await requestLogin(email, password);

    if (data.error) {
      toast.error(
        data.error.message
          .replace(
            "Invalid identifier or password",
            "Thông tin tài khoản hoặc mật khẩu không chính xác !"
          )
          .replace(
            "Your account has been blocked by an administrator",
            "Liên hệ với nhà trường để khắc phục"
          )
          .replace(
            "Too many requests, please try again later.",
            "Quá nhiều yêu cầu, vui lòng thử lại sau."
          )
      );
      return;
    }
    if (data.jwt) {
      setCookie("jwt", data.jwt, {
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 ngày nếu remember me, 1 ngày nếu không
        path: "/",
      });
      router.push("/");
      toast.success("Đăng nhập thành công");
      setRefresh((prev: boolean) => !prev);
    } else {
      toast.error("Đăng nhập thất bại");
    }
  };

  // hàm ghi nhớ đăng nhập
  useEffect(() => {
    console.log(rememberMe);

    if (rememberMe) {
      setCookie("rememberMe", email);
    } else {
      deleteCookie("rememberMe");
    }
  }, [rememberMe]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Phần bên trái - Hình ảnh */}
        <div className="hidden md:block relative overflow-hidden p-4">
          <img
            className="w-full h-full object-contain m-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_%C4%90%C3%B4ng_%C3%81_2015.png"
            alt="logo"
          />
        </div>

        {/* Phần bên phải - Form đăng nhập */}
        <div className="flex flex-col justify-center px-8 py-12 space-y-2">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-4xl font-bold text-blue-800 mb-6 tracking-tight">
              Đăng Nhập
            </h2>
            <p className="text-center text-gray-500 ">
              Chào mừng bạn quay trở lại! Vui lòng nhập thông tin.
            </p>
          </div>

          <form className="space-y-6">
            <Input
              placeholder="Nhập email của trường"
              value={email}
              onChange={(e) => setEmail(e)}
              icon={"Mail"}
              label="Email"
            />
            <Input
              placeholder="Nhập mật khẩu"
              value={password}
              label="Mật khẩu"
              onChange={(e) => setPassword(e)}
              type="password"
              icon={"Lock"}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                >
                  Ghi nhớ tài khoản
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg"
              >
                Đăng Nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
