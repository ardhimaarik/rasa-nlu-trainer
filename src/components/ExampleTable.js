// @flow

import React, { Component } from 'react';
import { Table, Input, Checkbox } from 'antd'
import { connect } from 'react-redux'
import ExampleEditor from './ExampleEditor'
import TextEditor from './TextEditor'
import IntentEditor from './IntentEditor'
import * as actions from '../state/actions'

const mapState = (state) => ({
  examples: state.examples || []
})

const mapActions = dispatch => ({
  expand: (idExample) => {
    dispatch(actions.expand(idExample))
  },
  collapse: (idExample) => {
    dispatch(actions.collapse(idExample))
  },
  onActionCheckChange: (event) => {
    dispatch(actions.onActionCheckChange(event))
  }
})

class ExampleTable extends Component {
  state: Object;

  constructor(props) {
    super(props)

    this.state = {
      filterDropdownVisible: false,
      searchText: '',
      tableChangedAt: Date.now(),
    }
  }

  render() {
    const {
      examples,
      expand,
      collapse,
      intents,
      entityNames,
      onActionCheckChange
    } = this.props

    const expandeds = examples
      .filter(example => example.isExpanded)
      .map(example => example.id)

    const { searchText, filterDropdownVisible, tableChangedAt } = this.state

    const columns = [
      {
        title: 'Intent',
        dataIndex: 'intent',
        key: 'intent',
        filters: intents.map(intent => ({
          text: intent,
          value: intent,
        })),
        render: (_, example) => (
          <IntentEditor
            example={example}
            intents={intents}
          />
        ),
        onFilter: (value, example) => (
          tableChangedAt < example.updatedAt
          || example.intent === value
        ),
        sorter: (a, b) => {
          return a.intent.localeCompare(b.intent)
        },
        width: 250
      }, {
        title: 'isAction',
        dataIndex: 'action',
        key: 'action',
        filters: examples.map(example => ({
          value: example.isAction
        })),
        render: (_, example) => (
          <span>
            <Checkbox
              value={example.id}
              checked={example.isAction}
              onChange={onActionCheckChange}>
            </Checkbox>
          </span>
        ),
        onFilter: (value, example) => (
          tableChangedAt < example.updatedAt
          || example.isAction === value
        ),
        width: 85
      }, {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        filters: examples.map(example => ({
          text: example.user,
          value: example.user,
        })),
        render: (_, example) => (
          <span>{example.user}</span>
        ),
        onFilter: (value, example) => (
          tableChangedAt < example.updatedAt
          || example.user === value
        ),
        sorter: (a, b) => {
          return a.user.localeCompare(b.user)
        },
        width: 185
      }, {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        render: (_, example) => (
          <TextEditor
            example={example}
            entityNames={entityNames}
          />
        ),
        sorter: (a, b) => {
          return a.intent.localeCompare(b.intent)
        },
        filteredValue: searchText ? [searchText] : null,
        onFilter: (value, example) => (
          tableChangedAt < example.updatedAt
          || !value
          || example.text.indexOf(value) !== -1
        ),
        filterDropdown: (
          <div className='custom-filter-dropdown'>
            <Input
              placeholder='search in texts'
              value={searchText}
              onChange={event => this.setState({
                searchText: event.target.value
              })}
            />
          </div>
        ),
        filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => this.setState({
          filterDropdownVisible: visible
        }),
      },
    ]

    // HACK to make the table exactly as high as the window with fixed header
    const scrollHeight = window.innerHeight - (41 + 32 + 32 + 22)

    return (
      <Table
        title={this.props.header}
        className='example-table'
        scroll={{ y: scrollHeight }}
        columns={columns}
        dataSource={examples}
        rowKey='id'
        size='middle'
        expandedRowKeys={expandeds}
        onExpand={(expanded, example) => {
          if (expanded) {
            expand(example.id)
          }
          else {
            collapse(example.id)
          }
        }}
        onRowClick={(example, index, event) => {
          //TODO: use expandRowByClick prop instead of this hack
          if (event.target.nodeName === 'TD') {
            if (expandeds.indexOf(example.id) !== -1) {
              collapse(example.id)
            }
            else {
              expand(example.id)
            }
          }
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '40', '80', '160', '320'],
          defaultPageSize: 40,
        }}
        expandedRowRender={(example) => (
          <ExampleEditor example={example} entityNames={entityNames} />
        )}
        onChange={() => this.setState({ tableChangedAt: Date.now() })}
      />
    )
  }
}

export default connect(mapState, mapActions)(ExampleTable)
