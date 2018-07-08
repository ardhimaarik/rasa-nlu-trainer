let exampleIDCounter = 0

export default function createExample({text='', intent='', entities=[], user='', isAction=false, source='', cid=''}) {
  return new Example(
    text,
    intent,
    entities,
    user,
    isAction,
    source,
    cid,
    Date.now(),
    false,
    (++exampleIDCounter).toString()
  )
}

export class Example{
    constructor(text, intent, entities, user, isAction, source, cid, updatedAt, isExpanded, id) {
        this.text = text
        this.intent = intent
        this.entities = entities
        this.user = user
        this.isAction = isAction
        this.source = source
        this.cid = cid
        this.updatedAt = updatedAt
        this.isExpanded = isExpanded
        this.id = id
    }
}