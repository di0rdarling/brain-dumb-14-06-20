import { Note } from "./objects/subObjects/note";
import { Resource } from "./objects/subObjects/resource";
import { Task } from "./objects/subObjects/task/task";

export interface Board {
  notes: Note[];
  resources: Resource[];
  tasks: Task[];
  boardCreatedByUser: string;
  boardName: string;
}
