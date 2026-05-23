// import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase("weather.db");

// export function initDatabase() {
//   db.transaction((tx) => {
//     tx.executeSql(`
//       CREATE TABLE IF NOT EXISTS weather_cache (
//         id INTEGER PRIMARY KEY NOT NULL,
//         data TEXT NOT NULL
//       );
//     `);
//   });
// }

// export function saveWeather(data: string) {
//   db.transaction((tx) => {
//     tx.executeSql("DELETE FROM weather_cache");

//     tx.executeSql("INSERT INTO weather_cache (data) VALUES (?)", [data]);
//   });
// }

// export function getSavedWeather(callback: (data: string | null) => void) {
//   db.transaction((tx) => {
//     tx.executeSql("SELECT data FROM weather_cache LIMIT 1", [], (_, result) => {
//       if (result.rows.length > 0) {
//         callback(result.rows.item(0).data);
//       } else {
//         callback(null);
//       }
//     });
//   });
// }
