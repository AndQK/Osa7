import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const order = (list) => {
  return list.slice().sort((b1, b2) => b2.likes - b1.likes)
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    setBlogs(state, action) {
      return order(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return order(
        state.map((blog) => {
          if (blog.id !== updatedBlog.id) {
            return blog
          } else {
            updatedBlog.user = blog.user
            return updatedBlog
          }
        })
      )
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)

      // now we can see who added a new blog without refreshing the page
      const adder = {
        id: newBlog.user,
        username: user.username,
        name: user.name,
      }
      newBlog.user = adder
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          {
            msg: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            name: 'success',
          },
          5
        )
      )
    } catch (exception) {
      dispatch({ msg: `${exception.response.data.error}`, name: 'error' }, 5)
    }
  }
}
export const likeBlog = (id, likes) => {
  return async (dispatch) => {
    try {
      const resBlog = await blogService.update(id, likes)
      dispatch(updateBlog(resBlog))
      dispatch(
        setNotification(
          {
            msg: `liked ${resBlog.title} by ${resBlog.author}`,
            name: 'success',
          },
          5
        )
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

export const removeBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
      dispatch(
        setNotification({ msg: `Removed ${blog.title}`, name: 'success' }, 5)
      )
    } catch (exception) {
      dispatch({ msg: `${exception.response.data.error}`, name: 'error' }, 5)
    }
  }
}
export default blogSlice.reducer
