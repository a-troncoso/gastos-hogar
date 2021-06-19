import * as SQLite from "expo-sqlite"

export const connectedDB = ({ engine, name }) => {
  const sqlite = SQLite.openDatabase(name)
  const engines = { sqlite }
  return engines[engine]
}
