import { Note } from "./objects/subObjects/note";
import { Post } from "./objects/subObjects/post";
import { Task } from "./objects/subObjects/task/task";

export interface Board {
  notes: Note[];
  posts: Post[];
  tasks: Task[];
  boardCreatedByUser: string;
  boardName: string;
}
