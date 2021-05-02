import * as SQLite from "expo-sqlite"
const inEnv = "db.GastosHogar"

export default SQLite.openDatabase(inEnv)

export const connectDB = ({ engine, name }) => {
  const sqlite = SQLite.openDatabase(name)

  const engines = { sqlite }
  return engines[engine]
}
