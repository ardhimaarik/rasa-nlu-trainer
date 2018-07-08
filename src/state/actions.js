import createExample from '../utils/createExample'

// @flow
const ROOT_PATH = "/api/"

export const RESET = 'RESET'
export const reset = (): Object => ({
  type: RESET,
})

export const EDIT = 'EDIT'
export const edit = (id: string, value: Object): Object => ({
  type: EDIT,
  payload: { id, value }
})

export const DELETE_EXAMPLE = 'DELETE_EXAMPLE'
export const deleteExample = (id: string): Object => ({
  type: DELETE_EXAMPLE,
  payload: { id }
})

export const SET_SELECTION = 'SET_SELECTION'
export const setSelection = (
  id: string,
  start: number,
  end: number,
): Object => ({
  type: SET_SELECTION,
  payload: { id, start, end }
})

export const SAVING_DONE = 'SAVING_DONE'
export const save = (source: string): Function =>  async (
  dispatch: Function
): Promise<void> => {
  const response = await fetch(`${ROOT_PATH}save`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: source,
  })
  //TODO add progressing feedback
  const json = await response.json()
  if (json.ok) {
    dispatch({
      type: SAVING_DONE,
    })
  }
}

export const EXPAND = 'EXPAND'
export const expand = (id: string): Object => ({
  type: EXPAND,
  payload: { id }
})

export const COLLAPSE = 'COLLAPSE'
export const collapse = (id: string): Object => ({
  type: COLLAPSE,
  payload: { id }
})

export const OPEN_ADD_MODAL = 'OPEN_ADD_MODAL'
export const openAddModal = (): Object => ({
  type: OPEN_ADD_MODAL,
})
export const CLOSE_ADD_MODAL = 'CLOSE_ADD_MODAL'
export const closeAddModal = (): Object => ({
  type: CLOSE_ADD_MODAL,
})
export const SAVE_AND_CLOSE_ADD_MODAL = 'SAVE_AND_CLOSE_ADD_MODAL'
export const saveAndCloseAddModal = (): Object => ({
  type: SAVE_AND_CLOSE_ADD_MODAL,
})

export const FETCH_DATA_FROM_DB = 'FETCH_DATA_FROM_DB'
export const unclassifiedConvos = (
  data: Object,
): Object => ({
  type: FETCH_DATA_FROM_DB,
  payload: { data }
})
export const fetchDataFromDb = () => async (dispatch: Function): Promise<void> => {
  const response: Object = await fetch(`${ROOT_PATH}unclassified_convos`, {
    method: 'GET',
  })
  const json = await response.json()
  dispatch(unclassifiedConvos(json))
}

export const CONVERSATION_OPENED = 'CONVERSATION_OPENED'
export const onOpenConversation = (source) => ({
  type: CONVERSATION_OPENED,
  payload: {source}
})

export const BACK_OVERVIEW = 'BACK_OVERVIEW'
export const onBackToConversationOverview = () => ({
  type: BACK_OVERVIEW
})

export const FILTER_CONVO_DONE = 'MARK_CONVO_DONE'
export const markConversationDone = (id, convos) => {
  return ({
    type: FILTER_CONVO_DONE,
    payload: {id, convos}
  })
}

export const updateUnclassifiedDone = (id, convos) => async (dispatch: Function): Promise<void> => {
  const classified = convos.filter(convo => convo.cid == id).find(convo => !!convo)

  const source = {'cid': classified.cid}

  const response = await fetch(`${ROOT_PATH}update_unclassified_done`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(source),
  })

  const json = await response.json()
  if (json.ok) {
    dispatch(markConversationDone(id, convos))
  }
}

export const ACTION_CHECK_CHANGE = 'ACTION_CHECK_CHANGE'
export const onActionCheckChange = (event) => {
  return ({
    type: ACTION_CHECK_CHANGE,
    payload: {event}
  })
}

export const CONVERT_TO_EXAMPLES = 'CONVERT_TO_EXAMPLES'
export const fetchConversationToExamples = (
  example: Object,
  name: String
): Object => ({
  type: CONVERT_TO_EXAMPLES,
  payload: {example, name}
})

async function getNluProposal(text){
  const response = await fetch(`${ROOT_PATH}getNluProposal`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'text': text})
  })

  const json = await response.json()
  return json;
}

async function convertTurnToExample(sentence, conversation) {
  const nluProposal = await getNluProposal(sentence.text);
  return createExample({
      "text": sentence.text, 
      "intent": nluProposal.intent.name,
      "entities": nluProposal.entities,
      "user": sentence.user,
      "source": conversation.source,
      "cid": conversation.cid
  });
}

export const convertConversationToExamples = (conversation, name) => (dispatch: Function): Promise<void> => {
  let sentences = conversation.turns;
  const getExamples = sentences.map( (sentence) => convertTurnToExample(sentence, conversation));

  dispatch(reset())
  
  getExamples.forEach(promise => promise.then(example => {
    dispatch(fetchConversationToExamples(example, name))
  }));
  
};

