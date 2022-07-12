const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  let persons = fetch(baseURL)
  return persons.then(response => response.json())
}

const create = newPerson => {
  let result = fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPerson)
      })
  return result.then(response => response.json())
}

const deletePerson = id => {
  fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
  });
}

const updatePerson = (id, data) => {
  let result = fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return result.then(response => response.json())
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, updatePerson }