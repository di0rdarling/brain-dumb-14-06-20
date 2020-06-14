import { ObjectType } from "./subObjects/objectType";
/**
 * The header of the object.
 */
export interface ObjectHeader {
  id: number;

  createdAuthor: string;

  modifiedAuthor?: string;

  content: string;

  objectType: ObjectType;

  subObjectDisplayValue?: string;
}
