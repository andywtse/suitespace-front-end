import { useState, useEffect } from 'react';
import { PropaneSharp } from '@mui/icons-material';
import { Typography, Button, Modal, Box } from '@mui/material'
import TodoItem from '../../components/Todo/TodoItem';
import './TodoList.css';
import '../../components/Todo/TodoAdd.jsx'
import * as todoService from '../../services/todoService'
import TodoModal from '../../components/Todo/TodoAdd.jsx';

const TodoList = (props) => {

  const [formData, setFormData] = useState({ // reMOVED THIS from MODAL
    title: '',
    description: '',
    dueDate: new Date(),
  })
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    const fetchAllTodos = async () =>{
      const todoData = await todoService.getAll()
      setTodos(todoData)
    }
    fetchAllTodos()
  }, [])
  
  const handleAddTodo = async newTodoData => {
    const newTodo = await todoService.create(newTodoData)
    setTodos([...todos, newTodo])
  }

  const handleDeleteTodo = async id => {
    const deletedTodo = await todoService.deleteTodo(id)
    setTodos(todos.filter(todo => todo._id !== deletedTodo._id))
  }

  const handleUpdateTodo = async updatedTodoFormData => {
    const updatedTodo = await todoService.update(updatedTodoFormData)
    const newTodosArray = todos.map(todo => 
      todo._id === updatedTodoFormData._id ? updatedTodoFormData : todo
    )
    setTodos(newTodosArray)
		// navigate('/')
  }

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
    <div className='todo-list'>
      <div className='todo-list-header | flex justify-between'>
        <h1>Todos</h1>
        <div>searchbar</div>
        <div>grab button</div>
      </div>
      <div>
        <Button onClick={handleOpen}>Add Todo</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Add Todo
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <TodoModal
                handleAddTodo={handleAddTodo}
                formData={formData}
              />
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className='todo-list-showing | flex'>
        <div>Showing Tag</div>
      </div>
      <div className='todo-list-body'>
        <>
          {console.log(todos)}
          {/* {todos?.map(todo => 
            <TodoItem
              key={todo._id}
              todo={todo}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
              style={style}
              user={props.user}
              // isList={true}
            />
          )} */}
        </>
      </div>
    </div>
    );
  }
  
  export default TodoList;

  