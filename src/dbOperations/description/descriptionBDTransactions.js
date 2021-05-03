import { DESCRIPTION_QUERIES } from "./descriptionQueries"
import { connectDB } from "../../dbOperations"

const dbName = "db.GastosHogar"
const connectedDB = connectDB({ engine: "sqlite", name: dbName })

export const fetchDescriptionById = descriptionId => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        DESCRIPTION_QUERIES.SELECT_DESCRIPTION_BY_ID,
        [descriptionId],
        (_, { rows }) => {
          resolve(rows._array[0])
        },
        error => {
          console.error("Error fetching DESCRIPTION_BY_ID: ", error)
        }
      )
    })
  })
}

export const patchDescription = (descriptionId, descriptioN) => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        DESCRIPTION_QUERIES.UPDATE_DESCRIPTION,
        [descriptioN.toString().toLowerCase(), descriptionId],
        () => {
          resolve("OK")
        },
        error => {
          console.error("Error fetching UPDATE_DESCRIPTION: ", error)
        }
      )
    })
  })
}

export const removeDescription = descriptionId => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        DESCRIPTION_QUERIES.REMOVE_DESCRIPTION,
        [descriptionId],
        () => {
          resolve("OK")
        },
        error => {
          console.error("Error fetching REMOVE_DESCRIPTION: ", error)
        }
      )
    })
  })
}

export const addDescription = (description, imageURI) => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        DESCRIPTION_QUERIES.ADD_DESCRIPTION,
        [description, imageURI],
        () => {
          resolve("OK")
        },
        error => {
          console.error("Error adding ADD_DESCRIPTION: ", error)
        }
      )
    })
  })
}
