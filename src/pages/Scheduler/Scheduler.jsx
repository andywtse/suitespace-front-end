//* File Imports *//
import './Scheduler.css'
import * as eventService from '../../services/eventsService'

//* React Hooks *//
import { useState, useEffect } from 'react'

//* Package Imports *//
import { Modal, Box, Typography, Backdrop, Fade } from '@mui/material'

//* Components *//
import ScheduleItem from './ScheduleItem'
import AddScheduleItem from './AddScheduleItem'

const Scheduler = ({ date }) => {
  //* Modal State and Style *//
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
  
  //* State *//
  const [eventsData, setEventsData] = useState([])

  //* useEffect *//
  useEffect(() => {
    const fetchAllEvents = async () =>{
      const eventData = await eventService.getAll()
      setEventsData(eventData)
    }
    fetchAllEvents()
  }, [])

  //* Backend Functions *//
  const handleAddEvent = async newEventData => {
    const newEvent = await eventService.create(newEventData)
    setEventsData([...eventsData, newEvent])
  }
  const handleEditEvent = async newEventData => {
    const newEvent = await eventService.update(newEventData)
    setEventsData([...eventsData, newEvent])
  }

  return (
    <div className='scheduler | flex flex-col gap-6'>
      <header className='scheduler-header | flex gap-6 items-center'>
        <h1 className='scheduler-date-display | text-lg'>
          {date.format('MMMM DD YYYY')}
        </h1>
        <button onClick={handleOpen} className='scheduler-add-event-button | flex justify-center items-center text-base rounded px-5'>
          Add Event
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          handleAddEvent={handleAddEvent}
          BackdropProps={{
            timeout: 1000,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                <span className='form-header'>
                  <span className='soft-yellow'>               
                    Add Event on: <br />
                  </span> 
                  {date.format('MMMM DD YYYY')}               
                </span>
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <AddScheduleItem date={date} handleAddEvent={handleAddEvent} />
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </header>
      <div className=' schedule-items-container | overflow-y-scroll flex flex-col gap-4'>
        {eventsData.map((event, idx) => 
          date.format('MMMM DD YYYY') === event.date ? 
            <ScheduleItem key={idx} date={date} event={event} handleEditEvent={handleEditEvent} />
          : ''
        )}
      </div>
    </div>
  )
}

export default Scheduler
