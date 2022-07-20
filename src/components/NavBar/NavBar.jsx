import { Link } from 'react-router-dom'
import './navbar.css'
import Signup from '../../pages/Signup/Signup'
import Login from '../../pages/Login/Login'
import ChangePassword from '../../pages/ChangePassword/ChangePassword'

import { Button } from '@mui/material'

const NavBar = ({ user, handleLogout, handleSignupOrLogin }) => {
  return (
    <>
      {user ?
        <nav className='| flex justify-start items-center px-6'>
          <ul className='| flex gap-12 items-center'>
            <li className='| text-2xl'>
              SuiteSpace
            </li>
            <li className='nav-username |'>
              {user.name}
            </li>
            <li>
              <button onClick={handleLogout} className='nav-button | flex justify-center items-center text-base rounded px-5 py-1'>
                Log Out
              </button>
            </li>
            <li>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </li>
          </ul>
        </nav>
        :
        <nav className='| flex justify-start items-center px-4'>
          <ul className='| flex gap-16 items-center'>
            <li className='nav-app-title | text-2xl'>
              SuiteSpace
            </li>
            <li>
              <Login handleSignupOrLogin={handleSignupOrLogin} />
            </li>
            <li>
              <Signup handleSignupOrLogin={handleSignupOrLogin} />
            </li>
          </ul>
        </nav>
      }
    </>
  )
}

export default NavBar
