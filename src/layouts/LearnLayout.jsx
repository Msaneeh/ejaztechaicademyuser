import { Outlet } from "react-router-dom";

export default function LearnLayout() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#0A0A0A] text-[#FAF8F5]">
      <Outlet />
    </div>
  );
}