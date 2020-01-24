import React from 'react'
import { Form, Input } from 'semantic-ui-react'
import { Query } from 'react-apollo'
import _ from 'lodash'

import FormContainer from '../../components/FormContainer/FormContainer'
import FormPanel from '../../components/FormPanel/FormPanel'
import { dropdownIcons } from '../../components/RobotIcon/DropdownIcons'
import RobotIcon from '../../components/RobotIcon/RobotIcon'
import InlineLoader from '../../components/InlineLoader/InlineLoader';
import { ALL_ROBOT_TYPES, ALL_UNASIGNED_ROBOTS } from './RobotGraphQL'
import { client } from '../../apollo'

const ICONS = _.keyBy(dropdownIcons, 'value')
function buildItems(items) {
  return items.map(({_id: value, name: text, icon}) => ({ text, value, image: (ICONS[icon] || {}).image }))
}

export default ({ instance, onCancel, onSubmit, updateField, error, loading }) => {
  return (
    <FormPanel action='Erebus' title='Robot Instance Form'>
      <button onClick={e => client.resetStore()} className='circular primary ui icon button' style={{position: 'absolute', right: '75px', top: '12px'}}>
        <i className='icon refresh'></i>
      </button>

      { instance.icon && <RobotIcon className='erebus icon' code={instance.icon}></RobotIcon> }
      <FormContainer error={error != null} onCancel={onCancel} onSubmit={(event) => onSubmit(event)}>
        { loading &&
          <InlineLoader />
        }
        <Form.Group widths='equal'>
          <input name='_id' type='hidden' value={instance._id || ''}></input>
          <input name='icon' type='hidden' value={instance.icon}></input>
          <Form.Dropdown value={instance.icon} label='Icon' onChange={(event, data) => {
            updateField('icon', data.value)
          }} placeholder='Select Icon' search selection options={dropdownIcons} />
          <Form.Input autoComplete='off' value={instance.name} onChange={(e, { value }) => updateField('name', value)} name='name' fluid label='Name' placeholder='Name' />
        </Form.Group>
        
        <Form.Group widths='equal'>
          <Query query={ALL_ROBOT_TYPES}>
          {({ loading, error, data }) => {
            const dropdownTypes = loading || error ? [] : buildItems(data.allTypes || [])
            return (
              <Form.Dropdown value={instance.typeId} label='Type' onChange={(event, data) => {
                updateField('typeId', data.value)
              }} placeholder='Select Type' noResultsMessage='There is not types' search selection options={dropdownTypes} />
            )
          }}
          </Query>
          <Form.Field>
            <label>Stream</label>
            <Input autoComplete='off' name='stream'
                onChange={(e, { value }) => updateField('stream', value)}
                label={{ tag: true, content: 'Link' }}
                labelPosition='right'
                value={instance.stream || ''}
                placeholder='https://player.twitch.tv/?channel=garyascuy' />
          </Form.Field>
        </Form.Group>

        <Form.TextArea name='description' onChange={(e, { value }) => updateField('description', value)} label='Description' rows='2' value={instance.description} />

        <Form.Group widths='equal'>
          <Query query={ALL_UNASIGNED_ROBOTS}>
          {({ loading, error, data }) => {
            const dropdownTypes = loading || error ? [] : buildItems(data.allRobots || [])
            return (
              <Form.Dropdown value={instance.registered} label='Registered' onChange={(event, data) => {
                updateField('registered', data.value)
              }} placeholder='Select Registered Robot' noResultsMessage='There is not registered robots' search selection options={dropdownTypes} /> 
            )
          }}
          </Query>
          
          <Form.Input value={instance.password} onChange={(e, { value }) => updateField('password', value)} type='password' autoComplete='off' name='password' fluid label='Password' placeholder='Password' />
        </Form.Group>

        {error && 
          <div className='ui error message'>
            <div className='header'>{error.message}</div>
            <pre style={{overflow: 'auto'}}>{error.stack}</pre>
          </div>
        }
      </FormContainer>
    </FormPanel>
  )
}