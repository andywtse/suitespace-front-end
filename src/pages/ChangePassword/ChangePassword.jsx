import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material'

const ChangePassword = props => {

  const [message, setMessage] = useState([''])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pw: '',
    newPw: '',
    newPwConf: '',
  })

  // MUI
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      pw: '',
      newPw: '',
      newPwConf: '',
    })
    setMessage('')
    setOpen(false);
  }

  const updateMessage = msg => {
    setMessage(msg)
  }

  const handleChange = e => {
    updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.changePassword(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      updateMessage(err.message)
    }
  }

  const { pw, newPw, newPwConf } = formData

  const isFormInvalid = () => {
    return !(pw && newPw && newPw === newPwConf)
  }

  return (
    <div>
      <button onClick={handleOpen} className='nav-button | flex justify-center items-center text-base rounded px-5 py-1'>
        Change Password
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContentText>
          {message}
        </DialogContentText>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="standard-password-input"
            label="Password"
            helperText="Password"
            type="password"
            name="pw"
            value={pw}
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
            name="newPw"
            value={newPw}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="standard-password-input"
            label="Confirm Password"
            helperText="Confirm Password"
            type="password"
            name="newPwConf"
            value={newPwConf}
            onChange={handleChange}
            autoComplete="off"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isFormInvalid()} onClick={handleSubmit}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ChangePassword
