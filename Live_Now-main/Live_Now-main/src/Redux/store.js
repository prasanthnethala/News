import { configureStore } from '@reduxjs/toolkit'
import user from "./Slices/userSlice"
export default configureStore({
  reducer: {
    user
  },
})