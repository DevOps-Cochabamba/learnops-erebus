import React from 'react'
import fetch from 'node-fetch'
import url from 'url'
import _ from 'lodash'

async function loadSession(_id, history) {
  try {
    const uri = url.resolve(process.env.REACT_APP_BACKEND, `/token`)
    const request = await fetch(uri, {
      method: 'post',
      body: JSON.stringify({ _id }),
      headers: { 'Content-Type': 'application/json' },
    })

    const token = await request.json()
    if (_.isEmpty(token)) {
      alert('Token does not exist or expire')
      return
    }

    const { value, ref } = token
    localStorage.setItem('x-erebus-token', value)
    history.push(ref)
  } catch(e) {
    console.log(e)
    alert('Unexpected Error')
  }
}

const Session = ({ match, history }) => {
  loadSession(match.params.id, history)

  return (
    <div className='session page content'>
      <div className='ui active inverted dimmer'>
        <div className='ui text loader'>Creating Session</div>
      </div>
    </div>
  )
}

export default Session
