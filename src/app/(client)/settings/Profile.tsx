
import React from "react";
import Input from "@/app/_components/common/Input";
import Icon from "@/app/_components/common/Icon";
import Loading from "@/app/_components/common/Loading";
import { useStore } from "@/app/store";

export default function Profile() {
  const { dataUsers } = useStore();



if (!dataUsers) {
  return <Loading/>
}
  return (
    <div className="flex flex-col gap-6 shadow-sm border border-gray-100 rounded-lg p-6">
      <div>
        <div className="flex items-center gap-2">
          <Icon icon="UserIcon" className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Thông tin cá nhân
          </h2>
        </div>
        <p className="text-gray-500 flex items-center gap-2 mt-2">
          <Icon icon="InfoIcon" className="text-gray-400" />
          {dataUsers.role_user === "students" ? "Thông tin sinh viên" : "Thông tin giảng viên"}
        </p>
      </div>

      {dataUsers.role_user === "students" && (
        <>
          {/* sinh viên */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Họ và tên"
              value={dataUsers.username}
              placeholder="Họ và tên"
              icon="UserIcon"
              onChange={() => {}}
            />
            <Input
              label="Email"
              value={dataUsers.email}
              placeholder="Email"
              icon="Mail"
              onChange={() => {}}
            />
            <Input
              label="Mã sinh viên"
              value={dataUsers.information_user.mav}
              placeholder="Mã sinh viên"
              icon="Fingerprint"
              onChange={() => {}}
            />
            <Input
              label="Lớp"
              value={dataUsers.information_user.class}
              placeholder="Lớp"
              icon="Users"
              onChange={() => {}}
            />
            <Input
              label="Ngành học"
              value={dataUsers.information_user.study}
              placeholder="Ngành học"
              icon="GraduationCap"
              onChange={() => {}}
            />
            <Input
              label="Khóa"
              value={dataUsers.information_user.lock}
              placeholder="Khóa"
              icon="Key"
              onChange={() => {}}
            />
          </div>
        </>
      )}
      {/* giảng viên */}
      {dataUsers.role_user === "lecturer" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
              label="Họ và tên"
              value={dataUsers.username}
              placeholder="Họ và tên"
              icon="UserIcon"
              onChange={() => {}}
            />
            <Input
              label="Email"
              value={dataUsers.email}
              placeholder="Email"
              icon="Mail"
              onChange={() => {}}
            />
            <Input
              label="Mã giảng viên"
              value={dataUsers.information_teacher.mgv}
              placeholder="Mã giảng viên"
              icon="Fingerprint"
              onChange={() => {}}
            />
          </div>
        </>
      )}
    </div>
  );
}
