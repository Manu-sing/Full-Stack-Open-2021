import React from 'react';

const Form = (props) => {
  return <div>
      <form onSubmit={props.submit}>
        <div className='form-element'>
          Name <input value={props.name} onChange={props.nameChange}/>
        </div>
        <div className='form-element'>
          Number <input value={props.number} onChange={props.numberChange}/>
        </div>
        <div className='form-element'>
          <button type="submit">add</button>
        </div>
      </form>
  </div>;
};

export default Form;