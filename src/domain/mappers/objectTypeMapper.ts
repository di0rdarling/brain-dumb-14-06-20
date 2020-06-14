import { ObjectType } from "../objects/subObjects/objectType";
import { ObjectTypeDisplayValue } from "../objects/displayValues/objectTypeDisplayValue";

export default class ObjectTypeMapper {
  static getObjectTypeDisplayValue(objectType: ObjectType) {
    switch (objectType) {
      case ObjectType.NOTE:
        return ObjectTypeDisplayValue.NOTE;
      case ObjectType.TASK:
        return ObjectTypeDisplayValue.TASK;
      case ObjectType.POST:
        return ObjectTypeDisplayValue.POST;
    }
  }
}
