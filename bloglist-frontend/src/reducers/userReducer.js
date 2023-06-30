import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return null
    },
  },
})

export const { login, logout } = userSlice.actions

export const storageLogin = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }
}
export default userSlice.reducer

export const tryLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(login(user))
      dispatch(
        setNotification({ msg: `logged in as ${username}`, name: 'success' }, 5)
      )
    } catch (exception) {
      dispatch(
        setNotification(
          {
            msg: `${exception.response.data.error}`,
            name: 'error',
          },
          5
        )
      )
    }
  }
}

export const logoutWithMsg = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
    dispatch(setNotification({ msg: 'logged out', name: 'success' }, 5))
  }
}
