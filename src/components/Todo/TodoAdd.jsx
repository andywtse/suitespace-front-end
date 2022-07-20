import { useState, useEffect, useRef } from 'react';


const TodoModal = (props) => {
  const [formData, setFormData] = useState({ // reMOVED THIS from MODAL
    title: '',
    description: '',
    dueDate: new Date(),
  })
  const [validForm, setValidForm] = useState(false)
  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }
  const formElement = useRef()
  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddTodo(formData)
  }

	return (
		<>
      <form onSubmit={handleSubmit} autoComplete='off' ref={formElement} className='flex flex-col gap-3'>
        <div className='flex flex-col'>
          <label>Due Date</label>
          <input className='input-item'
            name='dueDate'
            type='date'
            value={formData.dueDate}
            required
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <label>Title</label>
          <input className='input-item'
            name='title'
            type='text'
            value={formData.title}
            required
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col'>
          <label>Description</label>
          <input className='input-item'
            name='description'
            type='text'
            value={formData.description}
            required
            onChange={handleChange}
          />
        </div>
        <div className='btn-submit'>
          <button
            type='submit'
            disabled={!validForm}
          >
            Add Todo
          </button>
        </div>
      </form>
    </>
	)
}

export default TodoModal