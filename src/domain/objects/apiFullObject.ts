import { SubObjectTypes } from "./subObjects/subObjectTypes";

export interface ApiFullObject {
  content: string;
  createdApiUser: string;
  additionalNotes: string;
  subObjectType: SubObjectTypes;
  tag: string;
  postTitle: string;
}
