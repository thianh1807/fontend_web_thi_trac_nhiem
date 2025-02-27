import { Button, InputOtp } from "@nextui-org/react";
import Icon from "./Icon";

interface ModelOTPProps {
  setValueOtp: (value: string) => void;
  valueOtp: string;
  setIsOTP: (value: boolean) => void;
}

export default function Model_OTP({
  setValueOtp,
  valueOtp,
  setIsOTP,
}: ModelOTPProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex justify-between ">
          <h2 className="text-2xl font-bold  text-gray-800 mb-6">
            Xác thực OTP
          </h2>
          <button onClick={() => setIsOTP(false)}>
            <Icon icon="X" className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
        <p className="text-gray-600 text-center mb-8">
          Vui lòng nhập mã OTP đã được gửi đến email của bạn
        </p>
        <div className="flex flex-col items-center gap-4">
          <InputOtp
            autoFocus
            length={6}
            value={valueOtp}
            onValueChange={setValueOtp}
            classNames={{
              input: "w-12 h-12 text-2xl border-gray-300",
            }}
            errorMessage="Mã OTP của bạn nhập chưa đủ 6 số"
          />

          <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors mt-6">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
