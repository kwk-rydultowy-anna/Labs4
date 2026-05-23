export function saveWeather(data: string) {
  localStorage.setItem("weather", data);
}

export function getSavedWeather() {
  return localStorage.getItem("weather");
}
