
import { useAuth } from "@/hooks/useAuth";

import {
  recentCourses,
  stats,
  continueCourse,
  recommendedCourses,
} from "@/mockData/homeData";

import HomeStat from "@/components/HomeStat";
import RecentCouses from "@/components/RecentCouses";
import HomeHeader from "@/components/HomeHeader";
import WhereYouLeft from "@/components/WhereYouLeft";
import RecommendedCourses from "@/components/RecommendedCourses";

const Home = () => {
  const { user } = useAuth();
  const firstName = (user?.name || "Student").split(" ")[0];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className="space-y-12">
      
      <HomeHeader day={today} name={firstName} />

      <WhereYouLeft course={continueCourse} />

      {/* ---------------- Stats ---------------- */}
      <HomeStat sta={stats} />
      {/* ---------------- Recent courses ---------------- */}
      <RecentCouses rectCourses={recentCourses} />

      {/* ---------------- Recommended ---------------- */}
      <RecommendedCourses recCourses={recommendedCourses} />
    </div>
  );
}



export default Home;