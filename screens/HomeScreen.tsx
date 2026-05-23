import { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";

import { getCurrentLocation } from "../services/locationService";
import { fetchWeather } from "../services/weatherApi";
import { getSavedWeather, saveWeather } from "../services/storageService";

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadWeather() {
    try {
      setLoading(true);
      setError("");

      const location = await getCurrentLocation();

      const data = await fetchWeather(location.latitude, location.longitude);

      setWeather(data);

      saveWeather(JSON.stringify(data));
    } catch (err) {
      setError("Nie udało się pobrać pogody");
      const saved = getSavedWeather();

      if (saved) {
        setWeather(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ padding: 20, marginTop: 60 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Pogoda tu i teraz
      </Text>

      {error ? <Text>{error}</Text> : null}

      {weather ? (
        <>
          <Text>Temperatura: {weather.current.temperature_2m}°C</Text>

          <Text>Wiatr: {weather.current.wind_speed_10m} km/h</Text>

          <Text>Opady: {weather.current.precipitation} mm</Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Prognoza 24h
          </Text>

          {weather.hourly.time
            .slice(0, 24)
            .map((time: string, index: number) => (
              <View
                key={time}
                style={{
                  marginTop: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              >
                <Text>Godzina: {new Date(time).getHours()}:00</Text>

                <Text>
                  Temperatura: {weather.hourly.temperature_2m[index]}°C
                </Text>

                <Text>
                  Opady: {weather.hourly.precipitation_probability[index]}%
                </Text>
              </View>
            ))}
        </>
      ) : null}
      <Button title="Odśwież" onPress={loadWeather} />
    </View>
  );
}
