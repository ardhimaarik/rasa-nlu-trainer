import store from '../state/store'

function trimWhitespace(text, entities) {
  return entities.map((entity) => {
    let entityText = text.substring(entity.start, entity.end).trim()
    let entityPos = text.indexOf(entityText)
    return {
      start: entityPos,
      end: entityPos + entityText.length,
      value: entity.value,
      entity: entity.entity
    }
  })
}

export default function () {
  const result = store.getState().examples.map(
    ({text, intent, entities, user, isAction, source, cid}) => ({
      text, intent, entities: trimWhitespace(text, entities),
      user, isAction, source, cid
    })
  )
  return JSON.stringify(result, null, 2)
}