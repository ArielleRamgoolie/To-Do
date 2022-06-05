import PropTypes from 'prop-types'
import React from 'react'

const Button = ( {bgcolour, text, onClick} ) => {
  return (<button onClick={onClick} className='btn' style={ {backgroundColor: bgcolour} } >{text}</button>)
}

Button.propTypes = {
    bgcolour: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
    bgcolour: 'teal',
    text: 'button'
}

export default Button