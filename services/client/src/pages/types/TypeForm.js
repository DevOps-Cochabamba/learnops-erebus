import React from 'react'
import { Form, Input, Step, Icon } from 'semantic-ui-react'

import FormContainer from '../../components/FormContainer/FormContainer'
import FormPanel from '../../components/FormPanel/FormPanel'
import { dropdownIcons } from '../../components/RobotIcon/DropdownIcons'
import RobotIcon from '../../components/RobotIcon/RobotIcon'
import InlineLoader from '../../components/InlineLoader/InlineLoader';
import { getDropdownItems } from './helpers'

import * as Control from '../../core/Controls'
import * as Simulators from '../../core/Simulators'

export default ({ instance, onCancel, onSubmit, updateField, error, loading }) => {
  const controls = getDropdownItems(Control.getAll())
  const simulators = getDropdownItems(Simulators.getAll())
  
  return (
    <FormPanel action='Erebus' title='Robot Type Form'>
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
        <Form.TextArea name='description' onChange={(e, { value }) => updateField('description', value)} label='Description' rows='2' value={instance.description} />
        <Form.Group widths='equal'>
          <input name='control' type='hidden' value={instance.control}></input>
          <input name='simulator' type='hidden' value={instance.simulator}></input>
          <Form.Dropdown value={instance.control} onChange={(event, { value }) => updateField('control', value)} label='Control' placeholder='Select Control' fluid search selection options={controls} />
          <Form.Dropdown value={instance.simulator} onChange={(event, { value }) => updateField('simulator', value)} label='Simulator' placeholder='Select Simulator' fluid search selection options={simulators} />
        </Form.Group>
        <Form.Field>
          <label>Detail</label>
          <Input name='detail'
              onChange={(e, { value }) => updateField('detail', value)}
              label={{ tag: true, content: 'Link' }}
              labelPosition='right'
              value={instance.detail || ''}
              placeholder='http://example.com/path/to/my/doc.pdf'/>
        </Form.Field>
        <Form.Field>
          <Step.Group className='three mini'>
            <input name='state' value={instance.state} type='hidden' />
            <Step className='draft' active={'draft' === instance.state} onClick={() => updateField('state', 'draft')} as='a'>
              <Icon name='shipping fast' />
              <Step.Content>
                <Step.Title>Draft</Step.Title>
              </Step.Content>
            </Step>
            <Step className='published' active={'published' === instance.state} onClick={() => updateField('state', 'published')} as='a'>
              <Icon name='share alternate' />
              <Step.Content>
                <Step.Title>Published</Step.Title>
              </Step.Content>
            </Step>
            <Step className='deprecated' active={'deprecated' === instance.state} onClick={event => updateField('state', 'deprecated')} as='a'>
              <Icon name='undo alternate' />
              <Step.Content>
                <Step.Title>Deprecated</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Form.Field>
        <Form.TextArea name='actions' label='Actions' rows='4'
          onChange={(e, { value }) => updateField('actions', value)}
          placeholder='FirstAction=First Action Description'
          value={instance.actions} />
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