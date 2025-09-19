import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 focus:bg-white border border-gray-300 focus:border-indigo-500",
  outlined:
    "border border-gray-300 focus:border-indigo-500 bg-white hover:bg-gray-50",
  ghost: "bg-transparent border-none focus:ring-2 focus:ring-indigo-500",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
}) => {
  const [localValue, setLocalValue] = useState(value || "");
  const [showPassword, setShowPassword] = useState(type === "password");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col space-y-1 w-full max-w-md">
      {label && <label className="font-medium text-gray-700">{label}</label>}

      <div className="relative">
        <input
          aria-invalid={invalid}
          disabled={disabled}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={localValue}
          onChange={handleChange}
          className={`w-full rounded-xl outline-none transition-all duration-200 shadow-sm ${
            sizeClasses[size]
          } ${variantClasses[variant]} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${invalid ? "border-red-500 focus:border-red-500" : ""}`}
        />

        {clearable && localValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <p className="text-gray-500 text-sm">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

