//* React Hooks *//
import { useState } from "react"

//* Package Imports *//
import moment from "moment"
import { Modal, Box, Typography, Backdrop, Fade } from '@mui/material'

//* Components *//
import EditScheduleEvent from "./EditScheduleEvent"

const ScheduleItem = ({ date, event, handleUpdateEvent }) => {
  //* Modal State & Style *//
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    p: 4,
    color: 'white',
  }
  
  return (
    <>
      <div 
        className="schedule-item | flex w-full justify-between items-start"
        onClick={handleOpen}
      >
        <h1 className="schedule-item-time | text-lg self-center">
          {moment(`${event.time}`, 'hh:mm').format('h:mm A')}
        </h1>
        <div className="schedule-item-divider-container | flex items-center justify-center">
          <div className="schedule-item-vertical-line"></div>
        </div>
        <div className="schedule-item-description">
          <h2 className="schedule-item-category | text-sm" >
            {event.category}
          </h2>
          <h1 className="schedule-item-event-name | text-base">
            {event.description}
          </h1>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <span className='form-header'>
                <span className='soft-yellow'>               
                  Edit {event.category} on: <br />
                </span> 
                {date.format('MMMM DD YYYY')}               
              </span>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <EditScheduleEvent date={date} handleUpdateEvent={handleUpdateEvent} />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default ScheduleItem