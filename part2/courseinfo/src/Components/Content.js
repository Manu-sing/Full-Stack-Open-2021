import React from 'react';
import Part from './Part';

const Content = ( {part} ) => {


  return <div>

      {part.map(item =>
      <div key={item.id}> 
      <Part name={item.name} exercises={item.exercises}/>
      </div>
        )}
      
  </div>;
};

export default Content;

