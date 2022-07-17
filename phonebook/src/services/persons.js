// const baseURL = 'http://localhost:3001/api/persons'
const baseURL = '/api/persons'

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

const deletePerson = async id => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
  });
  await response.text();
}

const updatePerson = (id, data) => {
  const handleErrors = response => {
    if (!response.ok) {
      throw Error
    }
    return response
  }

  let result = fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  return result
          .then(handleErrors)
          .then(response => response.json())
          .catch(error => console.log('fail'))

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, updatePerson }