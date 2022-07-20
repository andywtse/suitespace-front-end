import { useState } from 'react'
import * as authService from '../../services/authService'

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const Login = props => {

  const [message, setMessage] = useState([''])
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
  })

  // MUI
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      email: '',
      pw: '',
    })
    setOpen(false);
  }

  const updateMessage = msg => {
    setMessage(msg)
  }

  const handleChange = e => {
    updateMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      window.location.reload();
    } catch (err) {
      updateMessage(err.message)
    }
  }

  return(
    <div>
      <button className='nav-button | flex justify-center items-center text-base rounded px-5 py-1' onClick={handleOpen}>
        Log In
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContentText>
          {message}
        </DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="standard-required"
            label="Email"
            helperText="Email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="standard-password-input"
            label="Password"
            helperText="Password"
            type="password"
            name="pw"
            value={formData.pw}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Log In</Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}

export default Login
