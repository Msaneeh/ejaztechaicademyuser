import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const ENROLLMENTS_KEY = "ejaztech_enrollments";

const getEnrollments = () => {
  try {
    return JSON.parse(localStorage.getItem(ENROLLMENTS_KEY) || "[]");
  } catch {
    return [];
  }
};

export function useCourseEnrollment(course, user) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Actually check enrollment instead of hardcoding false
  const isEnrolled = !!course && getEnrollments().includes(course.id);

  const redirectToAuth = () => {
    navigate(`/auth?redirect=/courses/${course.id}`);
  };

  const enrollFree = () => {
    if (!user) return redirectToAuth();

    const enrolled = getEnrollments();
    if (!enrolled.includes(course.id)) {
      localStorage.setItem(
        ENROLLMENTS_KEY,
        JSON.stringify([...enrolled, course.id])
      );
    }
    navigate(`/learn/${course.id}`);
  };

  const addToCartAndGo = () => {
    if (!user) return redirectToAuth();

    setIsAdding(true);
    addToCart(course);
    setTimeout(() => {
      setIsAdding(false);
      navigate("/cart");
    }, 600);
  };

  const goToCourse = () => navigate(`/learn/${course.id}`);

  return { isEnrolled, isAdding, enrollFree, addToCartAndGo, goToCourse };
}