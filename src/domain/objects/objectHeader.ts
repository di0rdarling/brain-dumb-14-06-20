import { ObjectType } from "./subObjects/objectType";
/**
 * The header of the object.
 */
export interface ObjectHeader {
  id: number;

  createdDateTime: string,

  createdAuthor: string;

  content: string;

  objectType: ObjectType;
}
