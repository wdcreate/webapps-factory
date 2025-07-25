import React from "react";

interface BannerProps {
  message: string;
  variant?: "info" | "success" | "warning" | "error";
}

export const Banner: React.FC<BannerProps> = ({
  message,
  variant = "info",
}) => {
  const getBgColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-100";
      case "warning":
        return "bg-yellow-100";
      case "error":
        return "bg-red-100";
      default:
        return "bg-blue-100";
    }
  };

  return (
    <div className={`${getBgColor()} p-4 rounded-md bg-blue-500`}>
      <p className="text-sm">{message}</p>
    </div>
  );
};
