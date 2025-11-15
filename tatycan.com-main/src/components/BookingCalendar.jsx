import { useState } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { X, Clock } from "lucide-react";
import "./BookingCalendar.css";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00"
];

const BookingCalendar = ({ selectedSlots = [], onSlotsChange }) => {
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    // Store as Date object normalized to start of day to avoid timezone issues
    setSelectedDate(startOfDay(date));
  };

  const handleTimeSelect = (time) => {
    if (!selectedDate) return;

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const slot = `${dateStr}T${time}`;
    const newSlots = [...selectedSlots];
    const index = newSlots.indexOf(slot);

    if (index > -1) {
      newSlots.splice(index, 1);
    } else {
      newSlots.push(slot);
    }

    onSlotsChange(newSlots);
  };

  const removeSlot = (slot) => {
    const newSlots = selectedSlots.filter((s) => s !== slot);
    onSlotsChange(newSlots);
  };

  const getSelectedDates = () => {
    return [...new Set(selectedSlots.map(slot => slot.split('T')[0]))];
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = format(date, "yyyy-MM-dd");
      const selectedDates = getSelectedDates();

      if (selectedDate && format(selectedDate, "yyyy-MM-dd") === dateStr) {
        return "active-date";
      }
      if (selectedDates.includes(dateStr)) {
        return "selected-date";
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        return "past-date";
      }
    }
    return null;
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }
    return false;
  };

  const isTimeSelected = (time) => {
    if (!selectedDate) return false;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    return selectedSlots.includes(`${dateStr}T${time}`);
  };

  return (
    <div className="booking-calendar-wrapper">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-4 relative"
      >
        <motion.div
          className="p-4 bg-gradient-to-r from-accent/15 via-accent/10 to-accent/15 border-2 border-accent/40 rounded-lg relative overflow-hidden"
          animate={{
            borderColor: ["rgba(214, 117, 121, 0.4)", "rgba(214, 117, 121, 0.7)", "rgba(214, 117, 121, 0.4)"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          />

          <div className="relative z-10 flex items-start gap-3">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex-shrink-0 mt-0.5"
            >
              <Clock className="h-5 w-5 text-accent" />
            </motion.div>
            <p className="text-sm text-dark leading-relaxed">
              <strong className="text-accent font-semibold">Puedes seleccionar múltiples fechas y horarios.</strong>
              <br />
              <span className="text-dark/80">Haz clic en una fecha del calendario y luego elige uno o varios horarios.</span>
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-dark mb-3 uppercase tracking-wider">
            1. Selecciona una fecha
          </h4>
          <Calendar
            onChange={handleDateClick}
            value={selectedDate}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate)
            }
            tileClassName={tileClassName}
            tileDisabled={tileDisabled}
            locale="es-ES"
            minDetail="month"
            className="custom-calendar"
            prev2Label={null}
            next2Label={null}
          />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-dark mb-3 uppercase tracking-wider">
            2. Selecciona horario(s)
          </h4>
          {selectedDate ? (
            <div className="time-slots-wrapper">
              <p className="text-xs text-dark/60 mb-3">
                Fecha seleccionada: <strong>{format(selectedDate, "dd MMM yyyy", { locale: es })}</strong>
              </p>
              <div className="time-slots-grid">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeSelect(time)}
                    className={`time-slot ${isTimeSelected(time) ? 'selected' : ''}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-neutral/10 rounded-md p-6">
              <p className="text-sm text-dark/60 text-center">
                Primero selecciona una fecha del calendario
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedSlots.length > 0 && (
        <div className="selected-dates-list">
          <p className="selected-dates-title">
            Fechas y horarios seleccionados ({selectedSlots.length}):
          </p>
          <div className="selected-dates-grid">
            {[...selectedSlots]
              .sort()
              .map((slot) => {
                const [date, time] = slot.split('T');
                return (
                  <div key={slot} className="selected-date-chip">
                    <span className="selected-date-text">
                      {format(new Date(date), "dd MMM", { locale: es })} • {time}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSlot(slot)}
                      className="remove-date-btn"
                      aria-label="Eliminar fecha y hora"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
