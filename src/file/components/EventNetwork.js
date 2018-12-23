import React, { Component } from 'react'
import { Network } from 'vis'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
    networkContainer: {
      width: '100%',
      height: '100%'
    },
    paperLayout: {
        height: 700       
    },
    eventNetworkContainer: {
        marginTop: theme.spacing.unit * 8, 
    }
})

const generateLabel = (event) => {
    const { location, activity } = event
    const fileName = location.split("/").pop()
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
            label: generateLabel(root)
        })

    }


    if (root.sources) {
        for (const source_data of root.sources) {
            const target = source_data.uri

            if (!currentNodes.includes(target)) {

                currentNodes.push(target)
                edgelist.nodes.push({
                    id: target,
                    label: generateLabel(source_data)
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
    componentDidMount () {

    }

    componentDidUpdate () {
        const { prov } = this.props
        if (! (Object.keys(prov).length === 0 && prov.constructor === Object) ) {
            const data = buildEdgeList(prov)
            var network = new Network(this.refs.eventNetwork, data, options);
        }
    }

    render () {
        const { classes } = this.props
        return (
            <Grid container className={ classes.eventNetworkContainer } spacing={32}>
                <Grid item xs={6} >
                    <div className={ classes.paperLayout }>
                        <div className={ classes.networkContainer } ref="eventNetwork"></div>  
                    </div>
                </Grid>  
                <Grid item xs={6}>
                    <Paper>
                     Detail<br /><br />
                    </Paper>
                </Grid>
            </Grid>        
        )
    }
}

export default withStyles(styles) (EventNetwork)