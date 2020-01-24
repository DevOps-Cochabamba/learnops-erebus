import React from 'react'
import { Segment, Popup } from 'semantic-ui-react'
import { translate } from 'react-i18next'
import QRCode from 'davidshimjs-qrcodejs'
import functional from 'react-functional'
import moment from 'moment'
import $ from 'jquery'

import RobotIcon from '../RobotIcon/RobotIcon'
import NoData from '../NoData/NoData'
import { openDocs, toggleQrCode, toggleActions } from './helpers'

import '../../styles/components/CardPanel.css'

const TypeItem = ({ type, onUpdateCall }) => {
  const { _id, name, state, icon, description, detail, actions, createdAt } = type

  return (
    <div className='erebus type item card'>
      <div className='ui two mini top attached right floated circular icon buttons'>
        <div title='Editar' onClick={e => onUpdateCall(type)} className='ui circular icon button'>
          <i className='cog icon'></i>
        </div>
      </div>
      <div className='ui two mini top attached left floated circular icon buttons'>
        <div title='Mostrar Documentación' onClick={event => openDocs(event, _id, detail)} className='ui circular icon button'>
          <i className='file alternate outline icon'></i>
        </div>
      </div>

      <div className='image'>
        <RobotIcon className='robot icon' max-height='120px' code={icon} />
        <div style={{ display: 'none' }} onClick={event => toggleQrCode(_id)} className={'qrcode ' + _id}>
          { !detail && <NoData style={{ margin: '10px 10px 0' }} /> }
        </div>
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
      <Segment style={{display: 'none'}} className={'actions ' + _id} secondary attached>
        <a href='#none' onClick={e => e.preventDefault()} className='ui top attached label'>Actions</a>
        { actions ?
          <pre style={{overflow: 'auto'}}>{actions}</pre> :
          <NoData />
        }
      </Segment>
      <div className='ui three bottom attached fluid buttons'>
        <Popup trigger={
          <div onClick={event => toggleActions(_id)} className='ui button'>
            <i className='unordered list icon'></i>
          </div>
        } inverted position='bottom center' content='Mostrar Acciones'/>
        <Popup trigger={
          <div onClick={event => toggleQrCode(_id)} className='ui button'>
            <i className='mobile alternate icon'></i>
          </div>
        } inverted position='bottom center' content='Mostrar Código de Documentación'/>
        <Popup trigger={
          <div className='ui button'>
            <i className={(state === 'published' ? 'green' : 'black') + ' share alternate icon'}></i>
          </div>
        } inverted position='bottom center' content={state === 'published' ? 'Publicado' : 'Privado'}/>
      </div>
    </div>
  )
}

TypeItem.componentDidMount = ({ type: { _id, detail } }) => {
  if (detail) {
    new QRCode($(`.qrcode.${_id}`)[0], {
      text: detail,
      width: 256,
      height: 256,
      colorDark : '#000000',
      colorLight : '#f2f2f2',
      correctLevel : QRCode.CorrectLevel.L
    })
  }
}

export default translate('bundle')(
  functional(TypeItem)
)
