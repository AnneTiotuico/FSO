const Search = ({ newSearch, handleNewSearch }) => {
  return (
    <div>
      filter shown with <input type="text" value={newSearch} onChange={handleNewSearch} />
    </div>
  )
}

export default Search