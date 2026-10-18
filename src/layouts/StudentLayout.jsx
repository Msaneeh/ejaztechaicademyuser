import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}