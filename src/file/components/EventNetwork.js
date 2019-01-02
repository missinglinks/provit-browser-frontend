import React, { Component } from 'react'
import { Network, Timeline, DataSet } from 'vis'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// throws error if css is missing
import 'vis/dist/vis-timeline-graph2d.min.css'
import './EventNetwork.css'

const styles = theme => ({
    networkContainer: {
      width: '100%',
      height: '100%'
    },
    paperLayout: {
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

const iterEventData = (root, edgelist) => {
    const currentNodes = edgelist.nodes.map( (node) => node.id )
    const source = root.uri

    if (!currentNodes.includes(source)) {
        currentNodes.push(source)
        edgelist.nodes.push({
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
                edgelist.nodes.push({
                    id: target,
                    label: generateLabel(source_data),
                    group: getFilename(source_data.location),
                    start: source_data.ended_at,
                    content: generateLabel(source_data),
                })
            }

            edgelist.edges.push({
                from: source,
                to: target,
                arrows: 'from'
            })
        }
        for (const source_data of root.sources) {
            iterEventData(source_data, edgelist)
        }
    }
}

const buildEdgeList = (data) => {
    const edgelist = {
        nodes: [],
        edges: []
    }
    console.log(data)
    iterEventData(data, edgelist)
    console.log(edgelist)
    return edgelist
}


  var options = {
    layout: {
      hierarchical: {
        sortMethod: "directed"
      }
    },
    edges: {
      smooth: true,
      arrows: {to : true }
    }
  };
   
  var events = {
      select: function(event) {
          var { nodes, edges } = event;
      }
  }

class EventNetwork extends Component {

    flatProvData (data) {
        this.provDict[data.uri] = data
        for (const source of data.sources) {
            this.flatProvData(source)
        }
    }

    renderProvDetails (uri) {
        const provDetails = document.getElementById("provDetails")
        const prov = this.provDict[uri]
        console.log(prov)
        if (prov) {
            provDetails.innerHTML = "<table class='prov-details'>" +
                                    "<tr>" +
                                    "<td> Uri</td><td>"+prov.uri+"</td>" +
                                    "</tr>" +
                                    "<tr>" +
                                    "<td> Ended</td><td>"+prov.ended_at+"</td>" +
                                    "</tr>" +
                                    "<tr>" +
                                    "<td>Agents</td><td>"+prov.agent +"</td>" +
                                    "</tr>" +
                                    "<tr>" +
                                    "<td>Actvity</td><td>"+prov.activity_desc+"</td>" +
                                    "</tr>" +
                                    "</table"
        }
        else
            provDetails.innerHTML = ""
    }

    componentDidUpdate () {
        const { prov } = this.props
        if (! (Object.keys(prov).length === 0 && prov.constructor === Object) ) {
            const data = buildEdgeList(prov)
            this.provDict = new Object()
            this.flatProvData(prov)
            console.log(this.provDict)

            const allGroups = data.nodes.map( (node,i ) => node.group )
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
            if (this.timeline)
                this.timeline.destroy() 
            this.network = new Network(this.refs.eventNetwork, data, options);
            this.timeline = new Timeline(this.refs.eventTimeline, data.nodes, {})
            this.timeline.setGroups(group)

            this.network.on("click", (event) => {
                const item = this.network.getNodeAt(event.pointer.DOM)
                this.renderProvDetails(item)
                if (item) {
                    this.timeline.setSelection(item)
                }
                else {
                    this.timeline.setSelection("")
                }
            })
            this.timeline.on("click", (event) => {
                const item = event.item            
                this.renderProvDetails(item)
                if (item) {
                    this.network.selectNodes( [item] )
                }
                else {
                    this.network.selectNodes([])
                }
            })            
        }
    }

    render () {
        const { classes } = this.props
        return (
            <Grid container className={ classes.eventNetworkContainer } spacing={32}>

                <Grid item xs={12}>
                    <div className={ classes.eventTimelineContainer } ref="eventTimeline"></div> 
                </Grid>
                <Grid item xs={6} >
                    <div className={ classes.paperLayout }>
                        <div className={ classes.networkContainer } ref="eventNetwork"></div>  
                    </div>
                </Grid>  
                <Grid item xs={6}>
                    <Paper>
                     Detail<br /><br />
                     <div id="provDetails"></div>
                    </Paper>
                </Grid>

            </Grid>        
        )
    }
}

export default withStyles(styles) (EventNetwork)