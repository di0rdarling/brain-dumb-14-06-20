import { ObjectHeader } from "../objectHeader";

export interface Note extends ObjectHeader {
  associatedLinks: string[];
}
