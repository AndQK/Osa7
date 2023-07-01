import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { storageLogin, logoutWithMsg } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(storageLogin())
  }, [dispatch])

  const blogFormRef = useRef()

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <h2>blogs</h2>
          <div className="loggedUser">
            {user.name} logged in
            <button
              className="logoutBtn"
              onClick={() => dispatch(logoutWithMsg())}
            >
              logout
            </button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm user={user} referenceFunc={blogFormRef} />
          </Togglable>
          <BlogList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
