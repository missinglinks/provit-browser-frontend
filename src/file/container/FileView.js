import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as api from '../api'
import { Network } from 'vis'

import EventNetwork from '../components/EventNetwork.js'

const mapStateToProps = (state) => ({
    prov: state.file.prov,
    currentFile: state.file.currentFile
})

const mapDispatchToProps = {
    changeCurrentFile: actions.changeCurrentFile,
    fetchProv: api.fetchProv
}

class FileView extends Component {

    componentDidMount () {
        const filepath = this.props.location.search.substr(1)
        console.log(filepath)
        if (filepath !== this.props.currentDirectory) {
            this.props.fetchProv(filepath)
            this.props.changeCurrentFile(filepath)        
        }        

    }

    render () {
        const { currentFile } = this.props 

        return (
            <div>
                File
                { currentFile || "" }
                <EventNetwork prov={ this.props.prov } />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (FileView)