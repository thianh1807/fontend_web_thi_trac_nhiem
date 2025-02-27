"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Change_password from "./Change_password";
import Profile from "./Profile";
import Link from "next/link";
import { LockIcon, UserIcon } from "lucide-react";

function SettingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tag = searchParams.get("tag");

  useEffect(() => {
    if (!tag) {
      router.push("/settings?tag=profile");
    }
  }, [tag, router]);

  const data = [
    {
      icon: <UserIcon className="w-5 h-5" />,
      name: "Thông tin cá nhân",
      href: "/settings?tag=profile",
    },
    {
      icon: <LockIcon className="w-5 h-5" />,
      name: "Đổi mật khẩu",
      href: "/settings?tag=password",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-[300px]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Cài đặt
                </h2>
                <div className="flex flex-col gap-3">
                  {data.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
                        tag === item.href.split("=")[1]
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              {tag === "password" && <Change_password />}
              {tag === "profile" && <Profile />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PageProfile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
