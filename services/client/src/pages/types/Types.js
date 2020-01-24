import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { Query, Mutation } from 'react-apollo'
import $ from 'jquery'
import _ from 'lodash'

import withMenu from '../HOC/withMenu/withMenu'
import withAuth from '../HOC/withAuth/withAuth'
import Header from '../../components/Header/Header'
import TypeItem from '../../components/TypeItem/TypeItem';
import { dropdownIcons } from '../../components/RobotIcon/DropdownIcons'
import InlineLoader from '../../components/InlineLoader/InlineLoader'
import GenericError from '../../components/GenericError/GenericError'
import NoData from '../../components/NoData/NoData'

import TypeForm from './TypeForm'
import { ALL_TYPES, CREATE_TYPE, UPDATE_TYPE } from './TypeGraphQL'
import { toggleForm } from './helpers'

import '../../styles/pages/types.css'

const defaultTypeInstance = {
  icon: '',
  name: '',
  description: 'Erebus - 1.0.0',
  control: 'gamepad.mobile',
  simulator: 'wheeled-robot.81',
  state: 'draft'
}

class Types extends Component {
  state = { instance: _.extend({}, defaultTypeInstance) }

  addNewType() {
    this.setState({instance: _.extend({}, defaultTypeInstance)})
    toggleForm(true)
  }

  onUpdateCall(instance) {
    this.setState({ instance })
    toggleForm(true)
  }

  updateField(name, value) {
    const instance = _.extend({}, this.state.instance)
    instance[name] = value
    if (name === 'icon' && instance.name.length < 1) {
      const icon = _.find(dropdownIcons, item => item.value === value)
      instance.name = icon.text
    }
    this.setState({ instance })
  }

  async onSubmit(event, createType, updateType) {
    const fields = $(event.target).serializeJSON()
    this.setState({instance: fields})
    try {
      if (_.isEmpty(fields._id)) {
        delete fields._id
        await createType({ variables: { fields } })
      } else {
        await updateType({ variables: { _id: fields._id, fields } })
      }
      toggleForm(false)
    } catch (e) {
      console.log(e)
    }
  }

  onCancel(event) {
    toggleForm(false)
  }

  render() {
    return (
      <div className='types page content'>
        <Header onAddButton={() => this.addNewType()}></Header>
        <Mutation mutation={CREATE_TYPE} refetchQueries={['allTypes']}>
          {(createType, createData) => (
            <Mutation mutation={UPDATE_TYPE} refetchQueries={['allTypes']}>
              {(updateType, updateData) => {
                return (
                  <TypeForm
                    instance={this.state.instance}
                    loading={createData.loading || updateData.loading}
                    error={createData.error || updateData.error}
                    updateField={(name, value) => this.updateField(name, value)}
                    onCancel={e => this.onCancel(e)} onSubmit={e => this.onSubmit(e, createType, updateType)}>
                  </TypeForm>
                )
              }}
            </Mutation>
          )}
        </Mutation>
        <br/>

        <div className='erebus types container'>
          <Query query={ALL_TYPES}>
            {({ loading, error, data }) => {
              if (loading) return <InlineLoader />
              if (error) return <GenericError error={error} />
              if (data.allTypes.length <= 0) return <NoData />

              const typesGroupedBy = _.groupBy(data.allTypes, item => item.state === 'deprecated' || item.state === 'published' ? 'published' : 'all')
              typesGroupedBy.published = typesGroupedBy.published || []
              typesGroupedBy.all = typesGroupedBy.all || []


              return (
                <div>
                  <div className='erebus ui types three stackable cards'>
                    {typesGroupedBy.all.map(type => (<TypeItem key={type._id} type={type} onUpdateCall={type => this.onUpdateCall(type)}></TypeItem>))}
                  </div>

                  { typesGroupedBy.published.length > 0 &&
                    <div>
                      <h3 className='ui horizontal divider header'>Publicados en la Comunidad</h3>
                      <div className='erebus ui types three stackable cards'>
                        {typesGroupedBy.published.map(type => (<TypeItem key={type._id} type={type} onUpdateCall={type => this.onUpdateCall(type)}></TypeItem>))}
                      </div>
                    </div>
                  }
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default translate('erbus')(
  withAuth(withMenu(Types, { types: 'active' }))
)