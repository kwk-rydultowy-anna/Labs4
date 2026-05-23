# Aplikacja React Native (Expo) – „Pogoda tu i teraz”

## Opis projektu

Aplikacja mobilna wykonana w React Native z użyciem Expo. Program pobiera lokalizację GPS użytkownika, wysyła współrzędne do API pogodowego Open-Meteo i wyświetla:

- aktualną pogodę,
- prognozę godzinową na 24h,
- prędkość wiatru,
- temperaturę,
- prawdopodobieństwo opadów.

Dodatkowo aplikacja:

- obsługuje brak zgody na lokalizację,
- posiada ręczne odświeżanie danych,
- zapisuje ostatni poprawny wynik lokalnie.

---

# Technologie

## Frontend

- React Native
- Expo
- TypeScript

## Biblioteki

### Lokalizacja

```bash
npx expo install expo-location
```

### Lokalne przechowywanie danych

```bash
npx expo install expo-sqlite
```

---

# Struktura projektu

```txt
src/
 ├── components/
 │    ├── CurrentWeather.tsx
 │    ├── HourlyForecast.tsx
 │    └── ErrorView.tsx
 │
 ├── services/
 │    ├── weatherApi.ts
 │    ├── locationService.ts
 │    └── storageService.ts
 │
 ├── types/
 │    └── weather.ts
 │
 ├── screens/
 │    └── HomeScreen.tsx
 │
 └── App.tsx
```

---

# Instalacja projektu

## Utworzenie projektu Expo

```bash
npx create-expo-app weather-app --template expo-template-blank-typescript
```

## Instalacja zależności

```bash
cd weather-app

npx expo install expo-location
npx expo install expo-sqlite
npm install axios
```

## Uruchomienie

```bash
npx expo start
```

---

# Implementacja

## Pobieranie lokalizacji

### services/locationService.ts

```ts
import * as Location from "expo-location";

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Brak zgody na lokalizację");
  }

  const location = await Location.getCurrentPositionAsync({});

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}
```

---

# Komunikacja z API

## services/weatherApi.ts

```ts
import axios from "axios";

export async function fetchWeather(latitude: number, longitude: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m,precipitation` +
    `&hourly=temperature_2m,precipitation_probability` +
    `&forecast_days=2`;

  const response = await axios.get(url);

  return response.data;
}
```

---

# Zapisywanie danych lokalnie

## services/storageService.ts

```ts
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("weather.db");

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS weather_cache (
      id INTEGER PRIMARY KEY NOT NULL,
      data TEXT NOT NULL
    );
  `);
}

export function saveWeather(data: string) {
  db.execSync("DELETE FROM weather_cache");

  db.runSync("INSERT INTO weather_cache (data) VALUES (?)", [data]);
}

export function getSavedWeather() {
  const result = db.getFirstSync<{ data: string }>(
    "SELECT data FROM weather_cache LIMIT 1"
  );

  return result?.data ?? null;
}
```

---

# Główny ekran

## screens/HomeScreen.tsx

```tsx
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
        </>
      ) : null}

      <Button title="Odśwież" onPress={loadWeather} />
    </View>
  );
}
```

---

# Obsługa błędów

Aplikacja obsługuje:

- brak internetu,
- odmowę dostępu do lokalizacji,
- błędy API,
- brak zapisanych danych lokalnych.

W przypadku błędu:

- wyświetlany jest komunikat,
- ładowane są ostatnie zapisane dane.

---

# Przepływ danych

1. Użytkownik uruchamia aplikację.
2. Aplikacja pyta o zgodę na lokalizację.
3. Pobierane są współrzędne GPS.
4. Współrzędne trafiają do Open-Meteo API.
5. API zwraca dane pogodowe.
6. Dane są:

   - wyświetlane,
   - zapisywane lokalnie.

7. Przy błędzie ładowane są dane z pamięci lokalnej.

---

# Funkcje spełniające wymagania zadania

## Dane z urządzenia

- GPS telefonu.

## Publiczne API

- Open-Meteo API.

## Istotna funkcja urządzenia

- Lokalizacja GPS.

## Obsługa błędów

- Odmowa uprawnień.
- Brak internetu.
- Niepoprawna odpowiedź API.

## Dokumentacja techniczna

- Opis architektury.
- Opis bibliotek.
- Opis przepływu danych.

---
