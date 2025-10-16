import { Outlet, useNavigate } from "react-router"
import { NavLink } from "react-router-dom"

import { useState, useEffect } from "react"

import { userService } from "../services/user"
import { login, signup } from "../store/actions/user.actions"
import { ImgUploader } from "../cmps/ImgUploader"

export function LoginSignup() {
  return (
    <div className="login-page">
      <span className="logo login-logo">InstaStam</span>

      <nav>
        <NavLink to="login">Login</NavLink>
        <NavLink to="signup">Signup</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    fullname: "",
  })
  const guestCredentials = { username: "guest", password: "guest" }
  const navigate = useNavigate()

  async function onLogin(ev = null) {
    if (ev) ev.preventDefault()
    if (credentials.guest !== true && !credentials.username) return
    if (credentials.guest === true) await login(guestCredentials)
    else await login(credentials)
    navigate("/story")
  }

  function handleChange(ev) {
    const { name, type, value, checked } = ev.target
    const fieldValue = type === "checkbox" ? checked : value
    console.log("field,value", name, fieldValue)
    setCredentials({ ...credentials, [name]: fieldValue })
  }
  return (
    <form className="login-form" onSubmit={onLogin}>
      <input
        type="username"
        name="username"
        value={credentials.username}
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        placeholder="Password"
        onChange={handleChange}
      />
      Or
      <div className="switch-container">
        <label className="switch">
          <input
            onChange={handleChange}
            type="checkbox"
            id="guest"
            name="guest"
          />
          <span className="slider"></span>
        </label>

        <label htmlFor="guest">Login as guest</label>
      </div>
      <button>Login</button>
    </form>
  )
}

export function Signup() {
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const navigate = useNavigate()

  function clearState() {
    console.log("clearing")

    setCredentials({ username: "", password: "", fullname: "", imgUrl: "" })
  }

  function handleChange(ev) {
    const type = ev.target.type

    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  async function onSignup(ev = null) {
    if (ev) ev.preventDefault()

    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    await signup(credentials)
    clearState()
    navigate("/")
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }
  return (
    <form className="signup-form" onSubmit={onSignup}>
      <input
        type="text"
        name="fullname"
        value={credentials.fullname}
        placeholder="Fullname"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        value={credentials.username}
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <div>
        <ImgUploader onUploaded={onUploaded} />
      </div>

      <button>Signup</button>
    </form>
  )
}
