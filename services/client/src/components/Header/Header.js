import React from 'react'

import '../../styles/components/header.css'

const Header = ({ onAddButton }) => (
  <div className='primary header'>
    <div onClick={event => onAddButton(event)} className='add command button'>+</div>
    <div className='search command input'>
      {/* <div className='ui search'>
        <div className='ui icon input'>
          <input className='prompt' type='text' placeholder='Buscar ...' />
          <i className='search icon'></i>
        </div>
      </div> */}
    </div>
  </div>
)

export default Header
