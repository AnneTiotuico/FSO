// const baseURL = 'http://localhost:3001/api/persons'
const baseURL = '/api/persons'

const getAll = () => {
  let persons = fetch(baseURL)
  return persons.then(response => response.json())
}

const create = async newPerson => {
  console.log('testing front')
  let response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPerson)
  })

  if (response.ok) {
    let result = await response.json()
    return result
  }
  let err = await response.json()
  throw err
}

const deletePerson = async id => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
  });
  await response.text();
}

const updatePerson = async (id, data) => {
  let response = await fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (response.ok) {
    let result = await response.json()
    return result
  }

  let err = await response.json()
  throw err
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, updatePerson }