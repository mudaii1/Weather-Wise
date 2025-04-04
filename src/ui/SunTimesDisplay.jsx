import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { calculateSunTimes, createDate } from "../services/helpers";

function SunTimesDisplay({ currentDay }) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 border-b-2 pt-20 pb-20 sm:flex-row sm:pt-26 md:flex-col lg:flex-row">
      <div>
        <h3 className="mb-5 text-center text-xl">Sunrise</h3>
        <div className="flex flex-col items-center space-y-2 rounded-4xl bg-gray-500/40 px-4 py-7 text-white">
          <Clock
            value={createDate(currentDay.date, currentDay.astro.sunrise)}
            hourHandLength={70}
            hourHandOppositeLength={30}
            hourHandWidth={3}
            minuteHandLength={100}
            secondHandLength={120}
            renderHourMarks={false}
            renderMinuteMarks={false}
            size={80}
          />
          <span className="text-xl text-nowrap">
            {currentDay.astro.sunrise}
          </span>
          <span className="text-lg">
            {calculateSunTimes(currentDay.astro.sunrise)}
          </span>
        </div>
      </div>
      <div className="sm:-translate-y-10 md:translate-y-0 lg:-translate-y-10">
        <h3 className="mb-5 text-center text-xl">Golden Hour</h3>
        <div className="flex flex-col items-center space-y-2 rounded-4xl bg-gray-500/40 px-4 py-7 text-white">
          <Clock
            value={createDate(currentDay.date, currentDay.astro.sunrise)}
            hourHandLength={70}
            hourHandOppositeLength={30}
            hourHandWidth={3}
            minuteHandLength={100}
            secondHandLength={120}
            renderHourMarks={false}
            renderMinuteMarks={false}
            size={80}
          />
          <span className="text-xl text-nowrap">
            {currentDay.astro.sunrise}
          </span>
          <span className="text-lg">{currentDay.astro.sunset}</span>
        </div>
      </div>
      <div>
        <h3 className="mb-5 text-center text-xl">Sunset</h3>
        <div className="flex flex-col items-center space-y-2 rounded-4xl bg-gray-500/40 px-4 py-7 text-white">
          <Clock
            value={createDate(currentDay.date, currentDay.astro.sunset)}
            hourHandLength={70}
            hourHandOppositeLength={30}
            hourHandWidth={3}
            minuteHandLength={100}
            secondHandLength={120}
            renderHourMarks={false}
            renderMinuteMarks={false}
            size={80}
          />
          <span className="text-xl text-nowrap">{currentDay.astro.sunset}</span>
          <span className="text-lg">
            {calculateSunTimes(currentDay.astro.sunset)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SunTimesDisplay;
