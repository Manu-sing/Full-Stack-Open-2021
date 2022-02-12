import React from 'react'

const Message = ({ message, classe }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={classe}>
      {message}
    </div>
  )
}

export default Message