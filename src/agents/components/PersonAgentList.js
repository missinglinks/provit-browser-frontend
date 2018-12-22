import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    content: {
      padding: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit * 8,
    },
    paperLayout: {
        padding: theme.spacing.unit * 2
    },
    detailsBox: {
        textAlign: 'left'
    }
})

class PersonAgentList extends Component {

    renderPerson(person, i) {
        const { classes } = this.props

        return (
            <div key={ "person"+i }>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    { person.name[0] } [ { person.slug} ]
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
                                <Typography gutterBottom>{ person.institution }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Email: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ person.email }</Typography>
                            </Grid>

                            <Grid item xs={1} className={ classes.detailsBox }>
                                <Typography gutterBottom>Homepage: </Typography>
                            </Grid>
                            <Grid item xs={11} className={ classes.detailsBox }>
                                <Typography gutterBottom>{ person.homepage.map( (item, i) => <div>{item}<br /></div> ) }</Typography>
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