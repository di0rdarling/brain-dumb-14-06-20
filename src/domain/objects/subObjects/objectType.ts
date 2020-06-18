export enum ObjectType {
  RESOURCE = "RESOURCE",
  TASK = "TASK",
  NOTE = "NOTE"
}

export const ObjectTypeDisplayLabel = new Map<string, string>([
  [ObjectType.RESOURCE, 'Resource'],
  [ObjectType.TASK, 'Task'],
  [ObjectType.NOTE, 'Note'],
])
