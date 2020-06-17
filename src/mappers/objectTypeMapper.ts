import { ObjectType } from "../domain/objects/subObjects/objectType";
import { ObjectTypeDisplayValue } from "../domain/objects/displayValues/objectTypeDisplayValue";

export default class ObjectTypeMapper {
  static getObjectTypeDisplayValue(objectType: ObjectType) {
    switch (objectType) {
      case ObjectType.NOTE:
        return ObjectTypeDisplayValue.NOTE;
      case ObjectType.TASK:
        return ObjectTypeDisplayValue.TASK;
      case ObjectType.RESOURCE:
        return ObjectTypeDisplayValue.RESOURCE;
    }
  }
}
