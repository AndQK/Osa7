import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    reset() {
      return ''
    },
  },
})

export const { notify, reset } = notificationSlice.actions

export const setNotification = (msg, duration) => {
  return async (dispatch) => {
    dispatch(notify(msg))
    setTimeout(() => {
      dispatch(reset())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
