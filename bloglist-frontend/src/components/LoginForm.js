import { useState } from 'react'
import { tryLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(tryLogin(username, password))
  }
  return (
    <div className="loginPage">
      <h2 className="loginHeader">log in to application</h2>
      <form onSubmit={handleLogin}>
        <div className="Username">
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="Password">
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}
export default LoginForm
