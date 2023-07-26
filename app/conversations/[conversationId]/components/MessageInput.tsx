"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IProps {
  id: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors?: FieldErrors<FieldValues>;
}

const MessageInput: React.FC<IProps> = ({
  id,
  placeholder,
  type,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
