import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { translate } from 'react-i18next'
import QRCode from 'davidshimjs-qrcodejs'
import $ from 'jquery'
import moment from 'moment'

import RobotIcon from '../RobotIcon/RobotIcon'
import { toggleQrCode } from './helpers'
import { CREATE_TOKEN } from './graphql'
import '../../styles/components/CardPanel.css'

const ICONS = [
  'mobile alternate icon',  // QR Code - Web Joystick
  'tv icon', // New Tab - Web Joystick
  'gamepad icon', // GamePad Real Device
  'keyboard icon', // Keyboard Real Device
]

const DESCRIPTIONS = {
  'mobile alternate icon': 'Movil/Código QR - Joystick Web',
  'tv icon': 'Escritorio - Joystick Web',
  'gamepad icon': 'Gamepad - Dispositivo Real',
  'keyboard icon': 'Teclado - Dispositivo Real'
}

const ICONS_MAP = {}
ICONS.map((icon, index) => ICONS_MAP[icon] = index)

function getIndex(event) {
  const $buttons = $(event.target).closest('.buttons')
  const $icon = $buttons.find('.control.button i')
  const index = ICONS_MAP[$icon.attr('class')]
  return { index, $icon }
}

const actions = {
  '0': async (id, createControlToken, qrcode) => {
    const ref = `/controls/gamepad/${id}?mode=web`
    const token = localStorage.getItem('x-erebus-token')
    const { data: { createControlToken: key }} = await createControlToken({ variables: { token, ref } })

    const baseUrl = process.env.PUBLIC_URL || 'http://192.168.0.10:2666'
    qrcode.current.setState({url: `${baseUrl}/s/${key}`})
    $(`.qrcode.${id}`).slideDown()
  },
  '1': (id) => window.open(`/controls/gamepad/${id}?mode=web`, '_blank'),
  '2': (id) => window.open(`/controls/gamepad/${id}?mode=gamepad`, '_blank'),
  '3': (id) => window.open(`/controls/gamepad/${id}?mode=keyboard`, '_blank'),
  default: (id) => console.log('Game Pad Not Installed', id),
}

function onOnline(event, id, type) {
  const simulator = (type || {}).simulator || ""
  const [kind] = simulator.split('.')
  window.open(`/simulators/${kind}/${id}`, '_blank')
}

function onNext(event) {
  const { index, $icon } = getIndex(event, '')
  const icon = ICONS[(index + 1) % ICONS.length]
  $icon.attr('class', icon)
  $icon.closest('.ui.control.button').prop('title', DESCRIPTIONS[icon])
}

function onPlay(event, id, createToken, qrcode) {
  const { index } = getIndex(event)
  const action = actions[index] || actions.default
  action(id, createToken, qrcode)
}

class QRCodeComponent extends Component {
  state = { url: '' }

  componentDidMount() {
    const baseUrl = process.env.PUBLIC_URL || 'http://192.168.0.10:2666'

    this.core = new QRCode($(`.qrcode.${this.props._id}`)[0], {
      text: `${baseUrl}/controls/gamepad/${this.props._id}?mode=web&key=7qMEH`,
      width: 256,
      height: 256,
      colorDark : '#000000',
      colorLight : '#f2f2f2',
      correctLevel : QRCode.CorrectLevel.L
    })
  }
  componentDidUpdate() {
    this.core.makeCode(this.state.url)
  }

  render() {
    return <div onClick={() => toggleQrCode(this.props._id)} className={'qrcode ' + this.props._id}></div>
  }
}

const RobotItem = ({ robot, onUpdateCall }) => {
  // eslint-disable-next-line
  const { _id, name, description, icon, type, createdAt } = robot
  const qrcode = React.createRef()

  return (
    <div className='erebus robot item card'>
      <div title='Editar' className='ui two mini top attached right floated circular icon buttons'>
        <div onClick={e => onUpdateCall(robot)} className='ui circular icon button'>
          <i className='cog icon'></i>
        </div>
      </div>
      <div title='Abrir Simulador' className='ui two mini top attached left floated circular icon buttons'>
        <div onClick={event => onOnline(event, _id, type)} className='ui circular icon button'>
          <i className='user secret icon'></i>
        </div>
      </div>

      <div className='image'>
        <RobotIcon className='robot icon' max-height='120px' code={icon} />
        <QRCodeComponent ref={qrcode} _id={_id}></QRCodeComponent>
      </div>

      <div className='content'>
        <div className='header'>{name}</div>
        <div className='meta'>
          <div>{moment(createdAt).fromNow()}</div>
        </div>
        <div className='description'>
          {description}
        </div>
      </div>

      <div className='ui three bottom attached fluid buttons'>
        <div className='ui online button'>
          <i className='wifi icon'></i>
          {/* restart, ping, list of options with robot */}
        </div>
        <div onClick={event => onNext(event)} title='Movil/Código QR - Joystick Web' className='ui control button'>
          <i className='mobile alternate icon'></i>
        </div>
        <Mutation mutation={CREATE_TOKEN} refetchQueries={[]}>
          {(createToken, updateData) => {
            const icon = updateData.loading ? 'refresh' : 'play'
            return (
              <div title='Iniciar' onClick={event => onPlay(event, _id, createToken, qrcode)} className='ui play button'>
                <i className={`${icon} icon`}></i>
              </div>
            )
          }}
        </Mutation>

      </div>
    </div>
  )
}

export default translate('bundle')(RobotItem)
