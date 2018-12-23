import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
    directoryList: {
      padding: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit * 8,
    },
    listItem: {
        padding: theme.spacing.unit *2,
        marginTop: theme.spacing.unit
    }
})

class DirectoryList extends Component {

    removeClick (directory) {
        this.props.removeDirectory(directory)
    } 

    render () {
        const { directories, classes } = this.props
        return (
            <Grid container className={ classes.directoryList }>
                { directories.map( (item, i) => (
                    <Grid item xs={12} key={i} >
                        <Paper className={ classes.listItem }>
                            <Link to={{ pathname: '/directory/', search: item }}>  { item } </Link>


                        <Fab color="secondary" aria-label="Delete" className={classes.fab} onClick={ () => this.removeClick(item) }>
                            <DeleteIcon  />
                        </Fab>
                        </Paper>
                    </Grid> 
                ) )}
            </Grid>
        )
    }
}


export default withStyles(styles) (DirectoryList)