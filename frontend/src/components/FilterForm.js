import React from 'react'

const FilterForm = ({filter, setFilter}) => {
    const handleFilterChange = event => {
      setFilter(event.target.value)
    }
    return(
      <>
      Filter name
      <input value={filter} onChange={handleFilterChange}/>
      </>
    )
}

export default FilterForm
