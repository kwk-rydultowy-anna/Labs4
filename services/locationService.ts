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
