import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// Services
import * as authService from './services/authService'
import * as locationService from './services/locationService'

// Main Pages
import FavoriteBar from './pages/FavoriteBar/FavoriteBar'
import Todolist from './pages/TodoList/TodoList'
import SideBar from './components/SideBar/SideBar'
import NewsFeed from './pages/NewsFeed/NewsFeed'
import Weather from './pages/Weather/Weather'


const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [location, setLocation] = useState(locationService.getLocation())

  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <SideBar />
      <FavoriteBar />
      <NewsFeed />
      <Todolist />
      <Weather />

      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={
            user ? (
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
