export function checkAirQuality(airQuality) {
  if (airQuality === 1) return "Good";
  if (airQuality === 2) return "Moderate";
  if (airQuality === 3) return "Unhealthy for People with conditions ⚠️";
  if (airQuality === 4) return "Unhealthy❌";
  if (airQuality === 5) return "Very Unhealthy ☠️";
  if (airQuality === 6) return "Hazardous 🚨";

  return "Undefined 🤷‍♂️";
}

export function checkUVQuality(uv) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme ☠️";
}

export function calculateSunTimes(sunrise) {
  function addMinutes(time, minutes) {
    let [hour, min, period] = time.match(/(\d+):(\d+) (AM|PM)/).slice(1);
    hour = parseInt(hour);
    min = parseInt(min) + minutes;

    if (min >= 60) {
      hour += 1;
      min -= 60;
    }

    return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")} ${period}`;
  }

  return addMinutes(sunrise, 30);
}

export function createDate(dateString, timeString) {
  // Example inputs
  // dateString = "2023-10-25"
  // timeString = "02:30 PM"

  // Parse the date string
  const [year, month, day] = dateString.split("-").map(Number);

  // Parse the time string
  let [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format if necessary
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Create the Date object
  const specificDate = new Date(year, month - 1, day, hours, minutes);

  return specificDate;
}
