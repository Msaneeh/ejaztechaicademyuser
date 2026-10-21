import {
  Clock,
  Edit3,
  BookOpen,
  Award,
} from "lucide-react";

import ProfileStatCard from "./ProfileStatCard"

const ProfileStats = ({ certificates }) => {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <ProfileStatCard icon={BookOpen} label="Enrolled Courses" value="4" />
        <ProfileStatCard icon={Clock} label="Hours Learned" value="24.5" />
        <ProfileStatCard icon={Award} label="Certificates" value={certificates.length.toString()} />
        <ProfileStatCard icon={Edit3} label="Assignments" value="12" />
      </section>
  )
}

export default ProfileStats