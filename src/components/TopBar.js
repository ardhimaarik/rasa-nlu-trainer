// @flow

import React, { Component } from 'react';
import { Button, Icon, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../state/actions'
import generateExport from '../utils/generateExport'

const mapState = (state) => ({
  openedConversationBundle: state.openedConversationBundle,
  unclassifiedConvos: state.unclassifiedConvos
})

const mapActions = dispatch => ({
  save: (examples) => {
    dispatch(actions.save(examples))
  },
  onBackToConversationOverview: () => {
    dispatch(actions.onBackToConversationOverview())
  },
  updateUnclassifiedDone: (id, convos) => {
    dispatch(actions.updateUnclassifiedDone(id, convos))
  }
})

class TopBar extends Component {

  render() {
    const { save, openedConversationBundle, onBackToConversationOverview, updateUnclassifiedDone, unclassifiedConvos } = this.props

    return (
      <div style={{ height: 32, display: 'flex' }}>

        <Button type="primary" onClick={() => onBackToConversationOverview()}>
          <Icon type="left" />Back
        </Button>

        <div style={{ flex: 1 }} />
        
        <h3 style={{ marginLeft: 8, marginTop: 5 }}>
          <strong>{openedConversationBundle.name}</strong>
        </h3>
        
        <div style={{ flex: 1 }} />

        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"
          placement="topLeft"
          onConfirm={() => {
            save(generateExport());
            onBackToConversationOverview();
            updateUnclassifiedDone(openedConversationBundle.key, unclassifiedConvos)
            }}>
          <Button> 
            DONE<Icon type="check" />
          </Button>
        </Popconfirm>
      </div>
    )
  }
}

export default connect(mapState, mapActions)(TopBar)
