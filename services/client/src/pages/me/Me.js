import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'

import withMenu from '../HOC/withMenu/withMenu'
import withAuth from '../HOC/withAuth/withAuth'

const Me = ({ t, i18n }) => (
  <div className='me page content'>
    <form className='ui form' onSubmit={event => event.preventDefault()}>
      <h4 className='ui dividing header'>{t('pages.me.generalSettings')}</h4>
      <div className='field'>
        <label>{t('pages.me.fields.language')}</label>
        <div className='field'>
          <button className='ui button' onClick={() => i18n.changeLanguage('en')}>English</button>
          <button className='ui button' onClick={() => i18n.changeLanguage('es')}>Spanish</button>
        </div>
      </div>

      <h4 className='ui dividing header'>{t('pages.me.systemInformation')}</h4>
      <div className='two fields'>
        <div className='field'>
          <label>{t('pages.me.fields.appName')}</label>
          <input value={t('app.name')} readOnly={true}/>
        </div>
        <div className='field'>
          <label>{t('pages.me.fields.buildVersion')}</label>
          <input value={t('app.version')} readOnly={true}/>
        </div>
      </div>
      <div className='two fields'>
        <div className='field'>
          <label>{t('pages.me.fields.author')}</label>
          <input value='Gary Ascuy Anturiano' readOnly={true}/>
        </div>
        <div className='field'>
          <label>{t('pages.me.fields.year')}</label>
          <input value='2020' readOnly={true}/>
        </div>
      </div>
      <h4 className='ui dividing header'>{t('pages.me.about')}</h4>
      <Link className={'ui blue button item'} to='/about'><i className='bug icon'></i>{t('app.name')}</Link>

    </form>
  </div>
)

export default translate('bundle')(
  withAuth(withMenu(Me, {me: 'active'}))
)
