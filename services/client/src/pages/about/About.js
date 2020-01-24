import React from 'react'
import { translate } from 'react-i18next'

import '../../styles/pages/about.css'

const About = ({ t }) => (
  <div className='about page content'>
    <div className='title'>{t('pages.about.title')}</div>
    <div className='content'>{t('pages.about.content')}</div>
    <div className='footer'>{t('pages.about.footer')}</div>
  </div>
)

export default translate('bundle')(About)
