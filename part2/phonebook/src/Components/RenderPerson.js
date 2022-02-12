import React from 'react';

const RenderPerson = (props) => {
  return (
    <li className="person">{props.name} / {props.number} <button onClick={props.delete}>delete</button></li>
  )
};

export default RenderPerson;