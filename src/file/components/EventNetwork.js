import React, { Component } from 'react'
import { Network, DataSet } from 'vis'
import { withStyles } from '@material-ui/core/styles'
// throws error if css is missing
import 'vis/dist/vis-timeline-graph2d.min.css'
const styles = theme => ({
    networkContainer: {
      width: '100%',
      height: 600
    },
    eventNetworkContainer: {
        marginTop: theme.spacing.unit * 8, 
    },
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
    console.log(fileName)
    return fileName + " [" + activitySlug + "]"
}

var options = {
    layout: {

    },
    edges: {
        smooth: true,
        arrows: {to : true }
    }
}
   
class EventNetwork extends Component {

    flatProvData (data) {
        this.provDict[data.uri] = data
        for (const source of data.sources) {
            this.flatProvData(source)
        }
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
    
                this.edges.update({
                    from: source,
                    to: target,
                    arrows: 'from'
                })
            }
            for (const source_data of root.sources) {
                this.iterProvData(source_data)
            }
        }     
    }

    buildEdgeList (prov) {
        this.iterProvData(prov)
    }


    constructor (props) {
        super(props)
        this.nodes = new DataSet()
        this.edges = new DataSet()
    }

    componentDidMount () {

        this.network = new Network(this.refs.eventNetwork, { nodes: this.nodes, edges: this.edges}, options)
        this.network.on("click", (event) => {
            const item = this.network.getNodeAt(event.pointer.DOM)
            console.log(item)
            this.props.changeProvEvent(item)
        })
    }

    componentDidUpdate () {
        const { prov, currentProvEvent, updateNetwork, networkUpdated } = this.props
        if (! (Object.keys(prov).length === 0 && prov.constructor === Object) && updateNetwork) {
            this.buildEdgeList(prov)
            networkUpdated()
        }

        console.log(currentProvEvent)
        if (currentProvEvent !== "" && currentProvEvent)
            this.network.selectNodes( [currentProvEvent] )
        else
            this.network.selectNodes( [] )            

    }

    render () {
        const { classes } = this.props
        return (
            <div>
                <div className={ classes.networkContainer } ref="eventNetwork"></div>  
            </div>
        )
    }
}

export default withStyles(styles) (EventNetwork)