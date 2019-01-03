import React, { Component } from 'react'
import { Timeline, DataSet } from 'vis'
import { withStyles } from '@material-ui/core/styles'
// throws error if css is missing
import 'vis/dist/vis-timeline-graph2d.min.css'

const styles = theme => ({
    eventTimelineContainer: {
        width: '100%',
        height: 280
    }
})

const getFilename = (location) => {
    return location.split("/").pop()
}

const generateLabel = (event) => {
    const { location, activity } = event
    const fileName = getFilename(location)
    const activitySplit = activity.split("/")
    const activitySlug = activitySplit[activitySplit.length - 2]
    return activitySlug
}


class EventTimeline extends Component {

    constructor (props) {
        super(props)
        this.nodes = new DataSet()
    }


    iterProvData (root) {

        const currentNodes = this.nodes.getIds()
        const source = root.uri
    
        if (!currentNodes.includes(source)) {
            currentNodes.push(source)
            this.nodes.update({
                id: source,
                label: generateLabel(root),
                group: getFilename(root.location),
                start: root.ended_at,
                content: generateLabel(root)
            })
    
        }
        
        if (root.sources) {
            for (const source_data of root.sources) {
                const target = source_data.uri
    
                if (!currentNodes.includes(target)) {
    
                    currentNodes.push(target)
                    this.nodes.update({
                        id: target,
                        label: generateLabel(source_data),
                        group: getFilename(source_data.location),
                        start: source_data.ended_at,
                        content: generateLabel(source_data),
                    })
                }

            }
            for (const source_data of root.sources) {
                this.iterProvData(source_data)
            }
        }     
    }


    componentDidMount () {

        const options = {
            verticalScroll: true,
            maxHeight: 250
        }

        this.timeline = new Timeline(this.refs.eventTimeline, this.nodes, options)
        this.timeline.on("click", (event) => {
            const item = event.item           
            this.props.changeProvEvent(item)
            this.timeline.on("click", (event) => {
                const item = event.item            
                this.props.changeProvEvent(item)
            })               
        })          
    }

    componentDidUpdate () {
        const { prov, currentProvEvent } = this.props
        if (! (Object.keys(prov).length === 0 && prov.constructor === Object) ) {
            this.iterProvData(prov)

            const allGroups = this.nodes.map( (node,i ) => node.group )
            const group = []
            const done = []
            for (const i in allGroups) {
                if (done.indexOf(allGroups[i]) < 0) {
                    group.push({
                        id: allGroups[i], 
                        content: allGroups[i] 
                    })
                    done.push(allGroups[i])
                }
            }
            this.timeline.setGroups(group)

            this.timeline.fit()       
        }
        if (currentProvEvent)
            this.timeline.setSelection(currentProvEvent)  
        else
            this.timeline.setSelection("")
    }


    render () {
        const { classes } = this.props
        return (
            <div>
                <div className={ classes.eventTimelineContainer } ref="eventTimeline"></div>  
            </div>
        )
    }

}

export default withStyles(styles) (EventTimeline)