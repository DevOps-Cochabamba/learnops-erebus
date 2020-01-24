import React from 'react'
import { translate } from 'react-i18next'

import RobotIcon from '../../components/RobotIcon/RobotIcon'
// import { auth } from '../../auth'

import '../../styles/pages/login.css'

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EY3lORFZDUkVRd1JUZ3pSamd5T0RjeU5UQTFNREpEUVRNM01rSTBRemRDT0RnME1qTXhRZyJ9.eyJuaWNrbmFtZSI6ImdhcnkuYXNjdXkiLCJuYW1lIjoiZ2FyeS5hc2N1eUBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNDUyZjMxMGFjODI5NjQ3YmM5ODA0OWE2MDJiYThhOTA_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZnYS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOS0xMi0wNFQwMToxMTowNC41OTNaIiwiZW1haWwiOiJnYXJ5LmFzY3V5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9lcmVidXMtdGhlc2lzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YmVlYmE4MDVlOTAwMzY5NDgzZTU0NTUiLCJhdWQiOiI4MkpIbE5BM1VPcUptbHd6VVFTY2lFT2tzY0x6QXlhOSIsImlhdCI6MTU3NTQzMTEwMywiZXhwIjoxNTc1NDY3MTAzLCJhdF9oYXNoIjoidTdZZ2NTNU1YeEtkV1MyaENiOTBLdyIsIm5vbmNlIjoiSnRRWjJJOVZYaWUxTHhTbU1GOXNtWUZLN1pGVmxyUjcifQ.ExXC5XvS6nnwfhOa2bdQd6GCKGZCGFo9E2R2MhWwRlmWlmn93tzWp2siwD9CWQOEono5pRC8feoK_eq6hJaOochQwFuCi2Fd4cEtWqMbzALjCURURkuz5vS836wlbpumEMeuUfCqC02O5lE-TtZDJu6_6wQrouqYZJn2TPAUtQq0ZCVk4Uhj8vaS-DHCm3kiZfmQkjUzGrURFjK2wOJIN_7pTORgqKnMrvRAMq35TaTl34S6cIKaEY-9nP4Awqm9Fn3CJFgTkpFMjBoMOJ60PQ_98QmAQOR5Kbalwb1YKwC4NoeBkrsEymIA3YKR9AzAgRE02hoEaRMcsbT_OG9Uug"

function changeHardCodedToken() {
  localStorage.setItem('x-erebus-token', token)
  window.location.href = '/'
}

const Login = ({ t }) => {
  localStorage.removeItem('x-erebus-token')


  return (
    <div className='login page content'>
      <div>
        <RobotIcon className='robot icon' max-height='120px' code={parseInt(Math.random() * 100, 10)}></RobotIcon>
      </div>
      <br />
      <button className='ui google plus button' onClick={e => changeHardCodedToken()} >
        <i className="openid icon"></i>
        {t('pages.login.button')}
      </button>
    </div>
  )
}

export default translate('bundle')(
  Login
)
