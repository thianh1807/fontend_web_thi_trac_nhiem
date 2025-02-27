"use client";
import { Input as InputNextUI } from "@nextui-org/react";
import Icon from "./Icon";
import { useState } from "react";

interface InputProps {
  placeholder: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: string;
  error?: string;
}

export default function Input({
  placeholder,
  label,
  value,
  onChange,
  type,
  icon,
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="w-full">
      <InputNextUI
        classNames={{
          inputWrapper: "w-full mt-[1rem]",
        }}
        startContent={icon && <Icon icon={icon} className="text-gray-400" />}
        endContent={
          type === "password" && (
            <button className="focus:outline-none" onClick={toggleVisibility}>
              {isVisible ? (
                <Icon icon="EyeIcon" className="text-gray-400" />
              ) : (
                <Icon icon="EyeOffIcon" className="text-gray-400" />
              )}
            </button>
          )
        }
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        label={label}
        labelPlacement={"outside"}
        maxLength={30}
        placeholder={placeholder}
        variant="bordered"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
