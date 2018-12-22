import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/deepOrange'

const styles = (theme) => ({
    fileTable: {
      padding: theme.spacing.unit * 4,
      marginTop: theme.spacing.unit * 8,
    },
    fileTablePaper: {
        padding: theme.spacing.unit*2
    },
    rowBackgroundNoProv: {
        backgroundColor: deepOrange[50]
    },
    rowBackgroundProv: {
        backgroundColor: null
    }
})

class FileTable extends Component {

    renderTableRow (item) {
        const { classes } = this.props
        let cl = classes.rowBackgroundProv
        if (!item.prov) {
            cl = this.props.classes.rowBackgroundNoProv
        }
        console.log(cl)
        return (
            <TableRow className={ cl } >
                <TableCell><Link to={{ pathname: "/file/", search: item.filepath }} >{item.filename} </Link></TableCell>
                <TableCell> { item.prov ? item.prov.last_activity : "No provenance information available!"} </TableCell>   
                <TableCell> { item.prov ? item.prov.timestamp : ""} </TableCell>   
            </TableRow>         
        )
    }

    render () {
        const { classes } = this.props
        return (
            <Grid xs={12} className={ classes.fileTable }>
                <Paper className={ classes.fileTablePaper }>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>File</TableCell>
                                <TableCell>Last Provenance Activity</TableCell>
                                <TableCell>Last Provenance Timestamp</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.props.fileList.map( (item) => this.renderTableRow(item) ) }                            
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles) (FileTable)