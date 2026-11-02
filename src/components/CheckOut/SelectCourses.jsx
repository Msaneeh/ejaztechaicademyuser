const SelectCourses = ({ cartItems, selectedIds, toggleSelection }) => {
  return (
    <>
      <section className="rounded-2xl border border-ink-line bg-surface p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">
          1. Select courses to pay for
        </h2>
        <div className="space-y-3">
          {cartItems.map((course) => {
            const isSelected = selectedIds.includes(course.id);
            return (
              <label
                key={course.id}
                className={[
                  "flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition",
                  isSelected
                    ? "border-ink bg-ink/[0.02]"
                    : "border-ink-line hover:border-ink/30",
                ].join(" ")}
              >
                <div className="flex h-5 items-center mt-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(course.id)}
                    className="h-5 w-5 rounded border-ink-line text-ink focus:ring-ink"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-ink">{course.title}</p>
                  <p className="text-xs text-ink-faint">By {course.mentor}</p>
                </div>
                <div className="font-semibold text-ink">
                  ₦{course.price.toLocaleString()}
                </div>
              </label>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-ink-line bg-surface p-6">
        <h2 className="text-lg font-semibold text-ink mb-4">
          2. Payment Method
        </h2>
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink bg-ink/[0.02] p-4">
            <input
              type="radio"
              name="payment"
              defaultChecked
              className="h-4 w-4 text-ink focus:ring-ink"
            />
            <div className="flex flex-1 items-center justify-between">
              <span className="font-medium text-ink">Paystack</span>
              <span className="text-xs text-ink-faint">
                Cards, Bank Transfer, USSD
              </span>
            </div>
          </label>
        </div>
      </section>
    </>
  );
};

export default SelectCourses;