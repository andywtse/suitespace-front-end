//* File Imports *//
import './SideBar.css'

//* React Hooks *//
import { useState } from 'react'

//* Package Imports *// 
import moment from 'moment'
import { ChevronRight } from '@mui/icons-material'

//* Components *//
import Calendar from '../../pages/Calendar/Calendar'
import Scheduler from '../../pages/Scheduler/Scheduler'

const SideBar = ({ open, handleSideBarOpen, handleSideBarClose, user }) => {
  //* State *//
  const [date, setDate] = useState(moment())
  
  //* Functions *//
  const currentYear = () => date.format('YYYY')

  return ( 
    <>
      <aside 
        className='sidebar-container | h-screen flex justify-start flex-col items-center gap-14' 
        style={open ? {diplay: 'block'} : {display: 'none'}}
      >
        <div 
          className='toggle-sidebar | fixed flex justify-center items-center group' 
          onClick={open ? () => handleSideBarClose() : () => handleSideBarOpen()}
        >
          <ChevronRight fontSize='large'/>
          <span className='sidebar-tooltip | group-hover:scale-100 scale-0'>
            Close Sidebar
          </span>
        </div>
        <header className='widget-header | text-3xl flex w-full justify-between'>
          <h1>Calendar</h1>
          <div>{currentYear()}</div>
        </header>
        <Calendar date={date} setDate={setDate} />
        <Scheduler date={date} user={user} />
      </aside>
    </>
  )
}

export default SideBar