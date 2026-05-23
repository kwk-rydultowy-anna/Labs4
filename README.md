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

# Instalacja projektu i uruchomienie

## Run project http://localhost:8081/

| Environment     | Install dependencies | Run project   |
| --------------- | -------------------- | ------------- |
| VS Code / local | `npm i`              | `npm run web` |
| CodeSandbox     | automatic            | `npm start`   |

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
