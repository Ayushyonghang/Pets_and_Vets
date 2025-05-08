import React, { useState } from "react";

interface DateTimeSelectionProps {
  selectedDate: string;
  selectedTime: string;
  availableTimeSlots: string[];
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  errors: Record<string, string>;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  selectedDate,
  selectedTime,
  availableTimeSlots,
  onSelectDate,
  onSelectTime,
  errors,
}) => {
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());

  const generateCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, date: null });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split("T")[0];

      days.push({
        day: i,
        date: dateStr,
        isToday: isToday(date),
        isPast: isPastDate(date),
      });
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const prevMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCalendarMonth(
      new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1)
    );
  };

  const formatTimeSlot = (timeSlot: string) => {
    const [hours, minutes] = timeSlot.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const days = generateCalendarDays();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-primary-600 py-4 px-6">
        <h2 className="text-xl font-bold text-white">Select Date & Time</h2>
        <p className="text-primary-100 text-sm mt-1">
          Choose an available date and time slot for your appointment
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-800">
                Select Date
              </label>
              {errors.date && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.date}
                </p>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Previous month</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <h3 className="text-base font-medium text-gray-900">
                  {calendarMonth.toLocaleString("default", { month: "long" })}{" "}
                  {calendarMonth.getFullYear()}
                </h3>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Next month</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 border-b border-gray-100">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="h-10 flex items-center justify-center text-xs font-medium text-gray-500 border-b border-gray-100"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className="h-12 border-b border-r border-gray-50 relative"
                  >
                    {day.day && (
                      <button
                        type="button"
                        disabled={day.isPast}
                        onClick={() => day.date && onSelectDate(day.date)}
                        className={`absolute inset-0 w-full h-full flex items-center justify-center
                          ${
                            day.isPast
                              ? "cursor-not-allowed text-gray-300"
                              : "cursor-pointer hover:bg-primary-50"
                          }
                          ${day.date === selectedDate ? "bg-primary-100" : ""}
                          ${day.isToday ? "font-semibold" : ""}
                        `}
                      >
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full
                            ${
                              day.date === selectedDate
                                ? "bg-primary-600 text-white"
                                : ""
                            }
                            ${
                              day.isToday && day.date !== selectedDate
                                ? "border border-primary-500 text-primary-700"
                                : ""
                            }
                          `}
                        >
                          {day.day}
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-800">
                Select Time
              </label>
              {errors.time && (
                <p className="text-red-500 text-xs font-medium">
                  {errors.time}
                </p>
              )}
            </div>

            {selectedDate ? (
              <div className="bg-white border border-gray-200 rounded-lg p-4 h-80 overflow-y-auto shadow-sm">
                {availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {availableTimeSlots.map((timeSlot) => (
                      <button
                        key={timeSlot}
                        type="button"
                        onClick={() => onSelectTime(timeSlot)}
                        className={`py-3 px-4 text-sm border rounded-lg transition-all flex items-center justify-center
                          ${
                            selectedTime === timeSlot
                              ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                              : "border-gray-200 hover:bg-gray-50 hover:border-primary-200 text-gray-700"
                          }
                        `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 mr-2 ${
                            selectedTime === timeSlot
                              ? "text-white"
                              : "text-primary-500"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formatTimeSlot(timeSlot)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-500 font-medium">
                      No available time slots
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Please select a different date
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-4 h-80 flex flex-col items-center justify-center shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-gray-500">Please select a date first</p>
                <p className="text-gray-400 text-sm mt-1">
                  Available time slots will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelection;
