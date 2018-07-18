// @flow

import React, { Component } from 'react'
import ExampleTable from './ExampleTable'
import TopBar from './TopBar'
import AddExampleModal from './AddExampleModal'
import CompatibilityAlert from './CompatibilityAlert'
import { connect } from 'react-redux'
import ConversationTable from './ConversationTable'
import {Spin, Table} from 'antd'

const mapState = (state) => ({
  examples: state.examples || [],
  isConvoOpened: state.isConvoOpened | false
})

class App extends Component {

  constructor(props){
    super(props)
  }

  renderedDetailConvo(examples){
    const intents = []
      examples.forEach(({intent}) => {
        if (intent && intents.indexOf(intent) === -1) {
          intents.push(intent)
        }
      })

      const entityNames = []
      examples.forEach((example) => {
        example.entities.forEach(({entity}) => {
          if (entity && entityNames.indexOf(entity) === -1) {
            entityNames.push(entity)
          }
        })
      })

      return (
        <div>
          <ExampleTable
            intents={intents}
            entityNames={entityNames}
            header={() => <TopBar />}
          />
          <AddExampleModal
            intents={intents}
            entityNames={entityNames}
          />
          <CompatibilityAlert />
        </div>
      )
  }

  render() {

    const {isConvoOpened} = this.props;
    
    if (isConvoOpened){
      const { examples } = this.props

      if(examples.length < 1){
        return (
          <Spin style={{marginTop: '10%'}}>
            <Table/>
          </Spin>
        )
      }
      
      return this.renderedDetailConvo(examples);
      
    }else{
       return <ConversationTable />
    }
  }
}

export default connect(mapState)(App)
