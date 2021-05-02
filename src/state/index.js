import { createContext } from "react"
import userContext from "../domain/user/context"

export const initialContext = { userContext }

const AppContext = createContext(initialContext)

export default AppContext
