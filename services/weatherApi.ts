export async function fetchWeather(latitude: number, longitude: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,precipitation` +
    `&hourly=temperature_2m,precipitation_probability` +
    `&forecast_days=2`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Błąd API");
  }

  return response.json();
}
