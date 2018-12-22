import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../api'

import PersonAgentList from '../components/PersonAgentList'
import SoftwareAgentList from '../components/SoftwareAgentList'

const mapStateToProps = (state) => ({
    persons: state.agents.persons,
    software: state.agents.software
})

const mapDispatchToProps = {
    fetchAgents: api.fetchAgents
}

class AgentListView extends Component {
    componentDidMount () {
        this.props.fetchAgents()
    }

    render () {
        return (
            <div>
                <PersonAgentList persons={ this.props.persons } />
                <SoftwareAgentList software={ this.props.software } />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AgentListView)