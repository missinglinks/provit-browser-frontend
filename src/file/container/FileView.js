import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions'
import * as api from '../api'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import EventNetwork from '../components/EventNetwork'
import EventTimeline from '../components/EventTimeline'
import EventDetails from '../components/EventDetails'


const mapStateToProps = (state) => ({
    prov: state.file.prov,
    currentFile: state.file.currentFile,
    agents: state.file.agents,
    currentProvEvent: state.file.currentProvEvent,
    updateNetwork: state.file.updateNetwork
})

const mapDispatchToProps = {
    changeCurrentFile: actions.changeCurrentFile,
    fetchProv: api.fetchProv,
    changeProvEvent: actions.changeProvEvent,
    networkUpdated: actions.networkUpdated
}

const styles = theme => ({
    fileViewContainer: {
        marginTop: 30
    },
    breadcrumbs: {
        marginBottom: theme.spacing.unit*2,
        textAlign: 'left'
    }
})


const splitFilepath = (filepath) => {
    const split = filepath.split('/')
    const slug = split[split.length-1]
    const dir = filepath.replace(slug, '')
    return [dir, slug]
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
        const { classes, currentFile } = this.props
        const filepath = splitFilepath(currentFile)
        return (
            <div className={ classes.fileViewContainer } >
                <Grid container>
                    <Grid item xs={12} className={ classes.breadcrumbs }>
                        <Typography variant="subheading" gutterBottom>
                            <Link to={{ pathname: "/directory/", search: filepath[0] }} >{ filepath[0] }</Link> > { filepath[1] }
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <EventTimeline prov={this.props.prov} changeProvEvent={this.props.changeProvEvent} currentProvEvent={this.props.currentProvEvent} />
                    </Grid>
                    <Grid item xs={8}>
                        <EventNetwork 
                            prov={this.props.prov} 
                            changeProvEvent={this.props.changeProvEvent} 
                            currentProvEvent={this.props.currentProvEvent} 
                            updateNetwork={this.props.updateNetwork}
                            networkUpdated={this.props.networkUpdated}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <EventDetails prov={this.props.prov} currentProvEvent={this.props.currentProvEvent} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const fileView = withStyles(styles) (FileView)

export default connect(mapStateToProps, mapDispatchToProps)(fileView)