import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    alignLeft: {
        textAlign: 'left',
        padding: theme.spacing.unit *2,
    }
})

class EventDetails extends Component {

    constructor (props) {
        super(props)
        this.eventData = {}
    }

    getEventData (root) {
        const { currentProvEvent } = this.props
        console.log(root.activity)
        if (root.uri === currentProvEvent)
            this.eventData = root
        else {
            if (root.sources)
                for (const source of root.sources)
                    this.getEventData(source)
        }
    }


    render () {

        const { classes, prov, currentProvEvent } = this.props
        if (currentProvEvent)
            this.getEventData(prov)
        else
            this.eventData = {}
        console.log(this.eventData)
        return (
            <div>
                <Paper className={ classes.alignLeft }>

                    <Typography variant="caption" gutterBottom>
                        <b>Event URI</b>
                    </Typography>                    
                    <Typography  variant="caption" gutterBottom>
                        {this.eventData.uri}
                    </Typography>

                    <Typography variant="caption" gutterBottom>
                        <b>Timestamp</b>
                    </Typography>  
                    <Typography  variant="caption" gutterBottom>
                        {this.eventData.ended_at}
                    </Typography>                    

                    <Typography variant="caption" gutterBottom>
                        <b>Description</b>
                    </Typography>  
                    <Typography  variant="caption" gutterBottom>
                        {this.eventData.activity_desc}
                    </Typography>    

                    <Typography variant="caption" gutterBottom>
                        <b>Agents</b>
                    </Typography>  
                    <Typography  variant="caption" gutterBottom>
                        {this.eventData.agent}
                    </Typography>      

                    <Typography variant="caption" gutterBottom>
                        <b>File location</b>
                    </Typography>  
                    <Typography  variant="caption" gutterBottom>
                        {this.eventData.location}
                    </Typography>    

                </Paper>
            </div>
        )
    }
}

export default withStyles(styles) (EventDetails)