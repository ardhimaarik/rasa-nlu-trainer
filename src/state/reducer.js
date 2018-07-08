// @flow
import immutable from 'object-path-immutable'
import pick from 'lodash/pick'
import createExample from '../utils/createExample'

import {
  EDIT,
  DELETE_EXAMPLE,
  SET_SELECTION,
  SAVING_DONE,
  EXPAND,
  COLLAPSE,
  OPEN_ADD_MODAL,
  CLOSE_ADD_MODAL,
  SAVE_AND_CLOSE_ADD_MODAL,
  RESET,
  CONVERT_TO_EXAMPLES,
  FETCH_DATA_FROM_DB,
  CONVERSATION_OPENED,
  BACK_OVERVIEW, 
  FILTER_CONVO_DONE,
  ACTION_CHECK_CHANGE
} from './actions'

export default function reducer (
  state: Object = {examples: []},
  action: Object
): Object {
  const { type, payload } = action

  function getExampleIndex(_id: string) {
    return state.examples.findIndex(({id}) => id === _id)
  }

  switch (type) {
    case RESET: {
      return {
        ...state,
        examples: [],
        isUnsaved: false,
        selection: null,
        idExampleInModal: null,
      }
    }
    case EDIT: {
      const { id, value } = payload
      const update = pick(value, ['text', 'intent', 'entities'])
      state = immutable.assign(
        state,
        `examples.${getExampleIndex(id)}`,
        { ...update, updatedAt: Date.now() },
      )
      return { ...state, isUnsaved: true }
    }
    case DELETE_EXAMPLE: {
      const { id } = payload
      state = immutable.del(
        state,
        `examples.${getExampleIndex(id)}`,
      )
      return { ...state, isUnsaved: true }
    }
    case SET_SELECTION: {
      const { id, start, end } = payload
      if (start === end) {
        return state
      }
      return immutable.set(state, `selection`, { idExample: id, start, end })
    }
    case SAVING_DONE: {
      return {
        ...state,
        isUnsaved: false,
      }
    }
    case EXPAND: {
      const { id } = payload

      return immutable.set(
        state,
        `examples.${getExampleIndex(id)}.isExpanded`,
        true,
      )
    }
    case COLLAPSE: {
      const { id } = payload

      return immutable.set(
        state,
        `examples.${getExampleIndex(id)}.isExpanded`,
        false,
      )
    }

    case OPEN_ADD_MODAL: {
      const example = createExample({})
      state = immutable.push(
        state,
        `examples`,
        example,
      )
      return immutable.set(state, `idExampleInModal`, example.id)
    }
    case CLOSE_ADD_MODAL: {
      state = immutable.del(
        state,
        `examples.${getExampleIndex(state.idExampleInModal)}`,
      )
      return immutable.set(state, `idExampleInModal`, null)
    }
    case SAVE_AND_CLOSE_ADD_MODAL: {
      return immutable.set(state, `idExampleInModal`, null)
    }
    case FETCH_DATA_FROM_DB: {
      const { data } = payload
      return {
        ...state,
        examples: [],
        unclassifiedConvos: data
      }
    }
    case CONVERSATION_OPENED: {
      const {source} = payload
      return {
        ...state,
        isConvoOpened: true,
        openedConversationBundle: source.openedConversationBundle
      }
    }
    case BACK_OVERVIEW: {
      return {
        ...state,
        isConvoOpened: false
      }
    }
    case FILTER_CONVO_DONE: {
      const {id, convos} = payload
      const unclassfied = convos.filter(convo => convo.cid != id)
      return {
        ...state,
        isConvoOpened: false,
        unclassifiedConvos: unclassfied
      }
    }
    case ACTION_CHECK_CHANGE: {
      const {event} = payload

      const setAction = (example) => {
        return immutable.set(example, 'isAction', event.target.checked);
      }

      const result = state.examples.map((example) => {
        if(example.id == event.target.value){
          return setAction(example)
        }
        return example
      })

      return {
        ...state,
        examples: result
      }
    }

    case CONVERT_TO_EXAMPLES: {
      const { example, name } = payload
      const newState = immutable.push(
        state,
        `examples`,
        example,
      )

      return {
        ...state,
        examples: newState.examples,
        conversationName: name,
      }
    }
    
    default:
      return state
  }
}
