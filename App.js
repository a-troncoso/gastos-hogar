import { start } from "./start"
import React, { useEffect, useState } from "react"
import { View, StyleSheet, Dimensions, Keyboard } from "react-native"
import { AppContext } from "./src/state/appContext"
import {
  createInitialTables,
  insertBasicData,
  selectBasicData,
  selectOldData
} from "./src/dbOperations/main"
import CustomRouter from "./src/router/CustomRouter"
import * as SQLite from "expo-sqlite"
import * as FileSystem from "expo-file-system"
import alerts from "./src/utils/alerts/Alerts"
import { useApp } from "./src/hooks/appHook"

const window = Dimensions.get("window")
const screen = Dimensions.get("screen")

start()

const App = () => {
  const app = useApp()
  const [isBasicTablesCreated, setIsBasicTablesCreated] = useState(false)
  const [heigthWithKeyboard, setHeigthWithKeyboard] = useState(false)
  const [isAppWithKeyboard, setIsAppWithKeyboard] = useState(false)

  useEffect(() => {
    _createInitialTables()
  }, [])

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow)

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow)
    }
  }, [])

  const _keyboardDidShow = e => {
    setIsAppWithKeyboard(true)
    const { height, screenX, screenY, width } = e.endCoordinates
    const window = Dimensions.get("window")
    const screen = Dimensions.get("screen")
    console.log("window height", window)
    console.log("screen height", screen)
    console.log("Keyboard height", height)
    console.log("height + window.height", height + window.height)

    setHeigthWithKeyboard(height + window.height)
  }

  const _createInitialTables = async () => {
    try {
      await createInitialTables({ withOverride: false })
      await insertBasicData()
    } catch (err) {
      console.err(err)
    }
    setIsBasicTablesCreated(true)
  }

  const _selectOldData = async () => {
    try {
      const oldData = await selectOldData("purchase")
      console.h1("oldData", oldData)

      FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}/OLD_DATABASE.txt`,
        JSON.stringify(oldData.rows)
      )
    } catch (err) {
      console.err(err)
    }
  }

  const _selectBasicData = async () => {
    try {
      const data = await selectBasicData("purchase")
      console.h1(data)

      FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}/OLD_DATABASE.txt`,
        JSON.stringify(data.rows)
      )
    } catch (err) {
      console.err(err)
    }
  }

  const _importSQLBase = async () => {
    FileSystem.downloadAsync(
      Expo.Asset.fromModule(require("./assets/db/db.mp4")).uri,
      `${FileSystem.documentDirectory}/SQLite/db.GastosHogar_v002`
    )
  }

  const _makeSQLiteDirAsync = async () => {
    const dbTest = SQLite.openDatabase("dummy.db")

    try {
      await dbTest.transaction(tx => tx.executeSql(""))
    } catch (e) {
      alerts.throwErrorAlert("crear _makeSQLiteDirAsync", JSON.stringify(e))
    }
  }

  const appViewStyle = isAppWithKeyboard => {
    // if (isAppWithKeyboard) return { height: heigthWithKeyboard }
    return {}
  }

  return (
    isBasicTablesCreated && (
      <AppContext.Provider value={app}>
        <CustomRouter />
      </AppContext.Provider>
    )
  )
}

const styles = StyleSheet.create({
  appView: {}
})

export default App
