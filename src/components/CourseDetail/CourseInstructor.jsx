const CourseInstructor = ({ course }) => {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-ink mb-4">Instructor</h2>
      <div className="rounded-2xl border border-ink-line bg-surface p-6">
        <div className="flex items-center gap-4">
          <img
            src="/logo.jpg"
            alt={course.mentor}
            className="h-16 w-16 rounded-full border border-ink-line object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-ink">{course.mentor}</h3>
            <p className="text-sm text-ink-soft">Expert Instructor</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          {course.mentor} is an industry expert specializing in{" "}
          {course.category}. They have years of experience building
          real-world applications and are passionate about teaching the next
          generation of developers.
        </p>
      </div>
    </section>
  );
};

export default CourseInstructor;