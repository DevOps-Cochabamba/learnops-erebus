import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import SignIn from './signin/SignIn'
import About from './about/About'
import Auth0 from './auth0/Auth0'
import Session from './session/Session'

import Me from './me/Me'
import Robots from './robots/Robots'
import Types from './types/Types'

import Control from './core/control/Control'
import Simulator from './core/simulator/Simulator'

const App = () => (
  <Router>
    <div className='router-container'>
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/about' component={About} />

      <Route exact path='/me' component={Me} />
      <Route exact path='/' component={Robots} />
      <Route exact path='/types' component={Types} />

      <Route path='/s/:id' component={Session} />
      <Route path='/controls/:name/:id' component={Control} />
      <Route path='/simulators/:name/:id' component={Simulator} />

      <Route path='/auth/callback' component={Auth0} />
    </div>
  </Router>
)

export default App
