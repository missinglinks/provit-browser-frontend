import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import LaptopIcon from '@material-ui/icons/Laptop'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    content: {
      padding: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit * 4,
    },
    paperLayout: {
        padding: theme.spacing.unit * 2
    },
    detailsBox: {
        textAlign: 'left',
    },
    detailsBoxHeader: {
        textAlign: 'left',
        marginRight: theme.spacing.unit*2
    },
    agentHeader: {
        padding:theme.spacing.unit
    }
})

class SoftwareAgentList extends Component {

    renderSoftware(sw, i) {
        const { classes } = this.props
        return (
            <div key={ "sw"+i }>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container>
                        <Grid item className={ classes.detailsBoxHeader }>
                        <Chip
                            avatar={
                            <Avatar>
                                <LaptopIcon />
                            </Avatar>
                            }
                            label={ sw.slug }
                        />
                        </Grid>
                        <Grid item className={ classes.detailsBoxHeader }>
                        <Typography variant="h6" >{ sw.name[0] } - { sw.version[0] }</Typography>
                        </Grid>
                    </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>URI: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ sw.uri }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Name: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ sw.name.map( (item, i) => <div>{item}<br /></div> ) }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Version: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ sw.version.map( (item, i) => <div>{item}<br /></div> ) }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Website: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ sw.homepage.map( (item, i) => <div><a href={item} target="_new"  rel="noopener noreferrer">{item}</a><br /></div> ) }</Typography>
                            </Grid>

                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }

    render () {
        const { software, classes } = this.props

        return (
            <Grid container className={ classes.root }>
                <Grid item xs={12} className={ classes.content }>
                    Software
                    <div className={ classes.paperLayout }>
                        { software.map( (item, i) => this.renderSoftware(item, i) ) }
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles) (SoftwareAgentList)