import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'

const withMenu = (WrappedComponent, options = {}) =>{
  const menu = class WithMenu extends React.Component {
    render() {
      const { t } = this.props

      return (
        <div className='main container'>
          <div className='with menu header'>
            <div className='ui vertical labeled icon menu'>
              <Link title='About Me' className={'item ' + (options.me || '')} to='/me'><i className='user outline icon'></i>{t('pages.me.menu')}</Link>
              <Link title='Robots & Control' className={'item ' + (options.robots || '')} to='/'><i className='android icon'></i>{t('pages.robots.menu')}</Link>
              <Link title='Types' className={'item ' + (options.types || '')} to='/types'><i className='rocket icon'></i>{t('pages.types.menu')}</Link>
              <Link title='Close Session' className='exit item' to='/signin'><i className='sign out icon'></i>{t('pages.exit.menu')}</Link>
            </div>
          </div>
          <div className='main content'>
            <WrappedComponent {...this.props}></WrappedComponent>
          </div>
        </div>
      )
    }
  }

  return translate('bundle')(menu)
}

export default withMenu