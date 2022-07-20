//* File Imports
import './Calendar.css'
import { daysOfWeek, renderCalendar } from './CalendarData'

//* React Hooks *//
import { useState, useEffect } from 'react'

//* Package Imports *//
import moment from "moment"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const Calendar = ({ date, setDate }) => {
  //* State *//
  const [calendar, setCalendar] = useState([])
  
  //* useEffect *//
  useEffect(() => {
    setCalendar(renderCalendar(date))
  }, [date])

  //* Variables *//
  let startOfMonth = date.clone().startOf('month')
  let endOfMonth = date.clone().endOf('month')

  //* Functions *// 
  const isSelected = (day) => date.isSame(day, 'day')
  const isToday = (day) => day.isSame(new Date(), 'day')
  const currentMonth = () => date.format('MMMM')
  const handlePrevMonth = () => setDate(date.clone().subtract(1, 'month').startOf('month'))
  const handleNextMonth = () => setDate(date.clone().add(1, 'month').startOf('month'))
  const handleCurrentDay = () => setDate(moment())

  //! Switch Refactor !//
  const dayStyles = (day) => {
    if (isToday(day)) return 'today' 
    if (isSelected(day)) return 'selected'
    if (day.isBefore(startOfMonth)) return 'before-month'
    if (day.isAfter(endOfMonth)) return 'after-month'
    return ''
  }

  return (
    <>
      <section className='calendar | flex justify-center items-center'>
        <header className='calendar-header | flex justify-between items-center text-2xl'>
          <div className='flex gap-6'>
            <h1>
              {currentMonth()} 
            </h1>
            <button className='calendar-today-button | flex justify-center items-center text-base rounded px-5' onClick={() => handleCurrentDay()}>
              Today
            </button>
          </div>
          <div className='calendar-button-container | flex'>
            <button className='flex justify-end' onClick={() => handlePrevMonth()}>
              <ChevronLeftIcon fontSize='large' />
            </button>
            <button className='flex justify-end' onClick={() => handleNextMonth()}>
              <ChevronRightIcon fontSize='large'/>
            </button>
          </div>
        </header>
        <div className='calendar-days-of-week | flex justify-around items-center'>
          {daysOfWeek.map((day, idx) => 
            <div key={idx} className='flex'>{day}</div>
          )}
        </div>
        <main className='calendar-body | flex justify-center items-center'>
        {calendar.map((week, index) => 
          <div className='week | flex justify-center items-center' key={index}>
            {week.map((day, idx) => 
              <div className='day | flex justify-around items-center' onClick={() => setDate(day)} key={idx}>
                <span className={dayStyles(day)} id='day'>
                  {day.format('D')}
                </span>
              </div>  
            )}
          </div>
        )}
        </main>
      </section>
    </>
  )
}

export default Calendar 