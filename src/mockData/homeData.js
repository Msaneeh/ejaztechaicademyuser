// src/mockData/homeData.js
import { BookOpen, PlayCircle, ClipboardList, Trophy } from "lucide-react";

export const stats = [
  { label: "Enrolled courses", value: "4", icon: BookOpen },
  { label: "Lessons completed", value: "12", icon: PlayCircle },
  { label: "Pending assessments", value: "2", icon: ClipboardList },
  { label: "Certificates earned", value: "1", icon: Trophy },
];

export const continueCourse = {
  id: "react-fundamentals",
  title: "React Fundamentals",
  mentor: "Eng. Ejaz",
  lastLesson: "Understanding Components",
  progress: 42,
  module: "Module 2 · Lesson 3 of 8",
};

export const recentCourses = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    mentor: "Eng. Ejaz",
    lessons: "12 of 28 lessons",
    progress: 42,
  },
  {
    id: "data-science",
    title: "Introduction to Data Science",
    mentor: "Eng. Maryam",
    lessons: "5 of 20 lessons",
    progress: 25,
  },
];

export const recommendedCourses = [
  {
    id: "ai-engineering",
    title: "AI Engineering",
    mentor: "Eng. Yusuf",
    category: "AI",
    rating: 4.9,
    duration: "10h 20m",
  },
  {
    id: "python-foundations",
    title: "Python Foundations",
    mentor: "Eng. Fatima",
    category: "Backend",
    rating: 4.8,
    duration: "6h 15m",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    mentor: "Eng. Ibrahim",
    category: "AI",
    rating: 4.9,
    duration: "7h 50m",
  },
  {
    id: "data-science",
    title: "Data Science Essentials",
    mentor: "Eng. Maryam",
    category: "Data",
    rating: 4.7,
    duration: "9h 05m",
  },
];