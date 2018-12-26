import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
    directoryList: {
      padding: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit * 8,
    },
    listItem: {
        padding: theme.spacing.unit *2,
        marginTop: theme.spacing.unit
    },
    directoryTitle: {
        textAlign: 'left',
        verticalAlign: 'middle' 
    },
    alignRight: {
        textAlign: 'right'
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
                            <Grid container>
                                <Grid item xs={11} className={ classes.directoryTitle }>
                                    <Typography variant="h6" >
                                        <Link to={{ pathname: '/directory/', search: item }}>  { item } </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={1} className={ classes.alignRight }>
                                    <IconButton aria-label="Delete"  onClick={ () => this.removeClick(item) }>
                                         <DeleteIcon fontSize="small"  />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid> 
                ) )}
            </Grid>
        )
    }
}


export default withStyles(styles) (DirectoryList)