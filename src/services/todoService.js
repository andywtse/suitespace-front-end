import * as tokenService from './tokenService'
const SERVER_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/todos`

async function create(todo) {
  const res = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: JSON.stringify(todo)
  })
	return await res.json()
}

async function deleteTodo(id) {
  const res = await fetch(`${SERVER_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  })
	return res.json()
}

async function update(todo) {
  const res = await fetch(`${SERVER_URL}/${todo._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}` 
    },
    body: JSON.stringify(todo)
  })
  return res.json()
}


// ----------------NEED TO READJUST PROTECTED ROUTES----------------

async function getAll() {
  const res = await fetch(`${SERVER_URL}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json'
    },
  })
  return await res.json()
}

export {
	create,
  getAll,
  deleteTodo,
  update
}