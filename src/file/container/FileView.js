import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import * as api from '../api'
import Grid from '@material-ui/core/Grid'
import EventNetwork from '../components/EventNetwork'
import EventTimeline from '../components/EventTimeline'
import EventDetails from '../components/EventDetails'

const mapStateToProps = (state) => ({
    prov: state.file.prov,
    currentFile: state.file.currentFile,
    agents: state.file.agents,
    currentProvEvent: state.file.currentProvEvent
})

const mapDispatchToProps = {
    changeCurrentFile: actions.changeCurrentFile,
    fetchProv: api.fetchProv,
    changeProvEvent: actions.changeProvEvent
}

class FileView extends Component {

    componentDidMount() {
        const filepath = this.props.location.search.substr(1)
        console.log(filepath)
        if (filepath !== this.props.currentFile) {
            this.props.fetchProv(filepath)
            //this.props.changeProvEvent(this.props.prov.uri)
            this.props.changeCurrentFile(filepath)
        }
    }


    render() {
        const { currentFile } = this.props
        return (
            <div>
                File
                {currentFile || ""}
                <Grid container>
                    <Grid item xs={12}>
                        <EventTimeline prov={this.props.prov} changeProvEvent={this.props.changeProvEvent} currentProvEvent={this.props.currentProvEvent} />
                    </Grid>
                    <Grid item xs={8}>
                        <EventNetwork prov={this.props.prov} changeProvEvent={this.props.changeProvEvent} currentProvEvent={this.props.currentProvEvent} />
                    </Grid>
                    <Grid item xs={4}>
                        <EventDetails prov={this.props.prov} currentProvEvent={this.props.currentProvEvent} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileView)