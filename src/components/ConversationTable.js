import React, { Component } from 'react'
import { Table, Spin } from 'antd';
import { connect } from 'react-redux'
import * as actions from '../state/actions'

const mapState = (state) => ({
    unclassifiedConvos: state.unclassifiedConvos || []
})

const mapActions = dispatch => ({
    onOpenConversation: (value) => {
        dispatch(actions.onOpenConversation(value))
    },
    convertConversationToExamples: (conversation, name) => {
        dispatch(actions.convertConversationToExamples(conversation, name))
    },
})

class ConversationTable extends Component {

    constructor(props) {
        super(props)
    }

    render() {        
        const { Column } = Table;
        const { unclassifiedConvos, convertConversationToExamples, onOpenConversation } = this.props

        if(unclassifiedConvos.length < 1){
            return (<Spin style={{marginTop: '10%'}}>
                <Table/>
            </Spin>)
        }

        const dataSource = unclassifiedConvos.map((unclassified) =>
            ({ "key": unclassified.cid, "name": `${unclassified.source}:${unclassified.cid}`, "conversation": unclassified })
        )

        return (
            <Table
                dataSource={dataSource}
                onRowClick={(record) => {
                    convertConversationToExamples(record.conversation, record.name)
                    onOpenConversation({ "openedConversationBundle": record })
                }}
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '15', '20', '40', '80', '160', '320'],
                    defaultPageSize: 15,
                }}>
                <Column
                    title="Conversations"
                    dataIndex="name"
                    render={text => <a href="javascript:;">{text}</a>}
                />
            </Table>
        )
    }
}

export default connect(mapState, mapActions)(ConversationTable)