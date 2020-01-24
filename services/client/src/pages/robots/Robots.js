import React, { Component } from 'react'
import { translate } from 'react-i18next'
import { Query, Mutation } from 'react-apollo'
import $ from 'jquery'
import _ from 'lodash'

import Header from '../../components/Header/Header'
import withMenu from '../HOC/withMenu/withMenu'
import withAuth from '../HOC/withAuth/withAuth'

import RobotItem from '../../components/RobotItem/RobotItem'
import { dropdownIcons } from '../../components/RobotIcon/DropdownIcons'
import InlineLoader from '../../components/InlineLoader/InlineLoader'
import GenericError from '../../components/GenericError/GenericError'
import NoData from '../../components/NoData/NoData'
import RobotForm from './RobotForm'

import { toggleForm } from './helpers'
import { ALL_ROBOTS, CREATE_ROBOT, UPDATE_ROBOT } from './RobotGraphQL'

import '../../styles/pages/robots.css'

const defaultRobotInstance = {
  icon: '',
  name: '',
  password: '',
  registerd: '',
  type: '',
  description: 'Erebus - 1.0.0',
  state: 'draft'
}
class Robots extends Component {
  state = { instance: _.extend({}, defaultRobotInstance) }

  addNewRobot() {
    this.setState({instance: _.extend({}, defaultRobotInstance)})
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
  
  async onSubmit(event, createRobot, updateRobot) {
    const fields = $(event.target).serializeJSON()
    fields.typeId = this.state.instance.typeId
    fields.registered = this.state.instance.registered
    fields.source = 'web'

    this.setState({instance: fields})
    try {
      if (_.isEmpty(fields._id)) {
        delete fields._id
        await createRobot({ variables: { fields } })
      } else {
        await updateRobot({ variables: { _id: fields._id, fields } })
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
      <div className='robots page content'>
        <Header onAddButton={e => this.addNewRobot()}></Header>
        <Mutation mutation={CREATE_ROBOT} refetchQueries={['allRobots', 'allUnasignedRobots']}>
          {(createRobot, createData) => (
            <Mutation mutation={UPDATE_ROBOT} refetchQueries={['allRobots', 'allUnasignedRobots']}>
              {(updateRobot, updateData) => {
                return (
                  <RobotForm
                    instance={this.state.instance}
                    loading={createData.loading || updateData.loading}
                    error={createData.error || updateData.error}
                    updateField={(name, value) => this.updateField(name, value)}
                    onCancel={e => this.onCancel(e)} onSubmit={e => this.onSubmit(e, createRobot, updateRobot)}>
                  </RobotForm>
                )
              }}
            </Mutation>
          )}
        </Mutation>
        <br />
        
        <div className='erebus types container'>
          {/* Update Query, source=web me using account  */}
          <Query query={ALL_ROBOTS}>
            {({ loading, error, data }) => {
              if (loading) return <InlineLoader />
              if (error) return <GenericError error={error} />
              if (data.allRobots.length <= 0) return <NoData />

              return (
                <div className='erebus ui robots three stackable cards'>
                  {data.allRobots.map(robot => (<RobotItem key={robot._id} robot={robot} onUpdateCall={robot => this.onUpdateCall(robot)} />))}
                </div>
              )
            }}
          </Query>
        </div>
        {/* <h3 className='ui horizontal divider header'>
          COMMUNITY
        </h3>
        <div className='ui robots three stackable cards'>
          <RobotItem id='Jjwjg6gouWLXhMGKW'></RobotItem>
        </div> */}
      </div>
    )
  }
}

export default translate('bundle')(
  withAuth(withMenu(Robots, {robots: 'active'}))
)
