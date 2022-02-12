import React from 'react';

const Filter = ({handleFilter, newFilter}) => {
  return <div>
      Filter by name <input value={newFilter} onChange={handleFilter}></input>
  </div>;
};

export default Filter;