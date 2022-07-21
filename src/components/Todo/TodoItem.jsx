import { Typography, Modal, Box } from '@mui/material'
import '../../pages/TodoList/TodoList.css'
import TodoEdit from '../../components/Todo/TodoEdit.jsx';
import { useState } from 'react';


const TodoItem = (props) => {

	const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 6,
    p: 4,
  }

	return (
		<>
			{props.user?.profile === props.todo.owner && 
      	<div className='todo-item' onClick={handleOpen}>
					<input type="checkbox" />
					<div className='todo-item-content'>
						<p>Title: {props.todo.title}</p>
						<p>Description: {props.todo.description}</p>
					</div>
      </div>
				}
				<Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              {props.todo.title}
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <TodoEdit
                todo={props.todo}
								formData={props.formData}
								setFormData={props.setFormData}
								handleUpdateTodo={props.handleUpdateTodo}
								handleDeleteTodo={props.handleDeleteTodo}
              />
            </Typography>
          </Box>
        </Modal>
		</>
	)
}

export default TodoItem


