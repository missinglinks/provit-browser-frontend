import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography'
import FaceIcon from '@material-ui/icons/Face'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
    content: {
      padding: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit * 8,
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

class PersonAgentList extends Component {

    renderPerson(person, i) {
        const { classes } = this.props

        return (
            <div key={ "person"+i }>
                <ExpansionPanel className={ classes.agentHeader }>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container>
                        <Grid item className={ classes.detailsBoxHeader }>
                        <Chip
                            avatar={
                            <Avatar>
                                <FaceIcon />
                            </Avatar>
                            }
                            label={ person.slug }
                        />
                        </Grid>
                        <Grid item className={ classes.detailsBoxHeader }>
                        <Typography variant="h6" >{ person.name[0] }</Typography>
                        </Grid>
                    </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>URI: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ person.uri }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Name: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ person.name.map( (item, i) => <div>{item}<br /></div> ) }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Institution: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ person.institution.map( (item, i) => <div>{item}<br /></div> ) }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Email: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ person.email.map( (item, i) => <div>{item}<br /></div> ) }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Homepage: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ person.homepage.map( (item, i) => <div><a href={item} target="_new"  rel="noopener noreferrer">{item}</a><br /></div> ) }</Typography>
                            </Grid>

                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }

    render () {
        const { persons, classes } = this.props

        return (
            <Grid container>
                <Grid item xs={12} className={ classes.content }>
                    Persons
                    <div className={ classes.paperLayout }>
                        { persons.map( (map, i) => this.renderPerson(map, i) ) }
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles) (PersonAgentList)