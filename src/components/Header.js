import React from 'react'
// Fun fact: this ^ is no longer needed for every react component :)
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className='header'> 
      <h1>{title}</h1>
      <Button bgcolour={showAdd ? 'darkred' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick = {onAdd}/>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

Header.defaultProps = {
    title: 'To Do'
}

export default Header