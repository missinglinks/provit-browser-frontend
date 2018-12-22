import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as api from '../api'

import DirectoryList from '../components/DirectoryList'
import AddDirectoryForm from '../components/AddDirectoryForm'

const mapStateToProps = (state) => ({
    directories: state.home.directories,
    loading: state.home.loading,
    error: state.home.error
})

const mapDispatchToProps = {
    fetchDirectories: api.fetchDirectories,
    removeDirectory: api.removeDirectory,
    addDirectory: api.addDirectory
}

class HomeView extends Component {

    componentDidMount () {
        this.props.fetchDirectories()
    }

    render () {
        return (
            <div>
                <DirectoryList directories={this.props.directories} removeDirectory={this.props.removeDirectory} />
                <AddDirectoryForm addDirectory={this.props.addDirectory} />
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (HomeView)