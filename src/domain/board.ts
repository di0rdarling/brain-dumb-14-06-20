import { Note } from "./objects/subObjects/note";
import { Post } from "./objects/subObjects/post";
import { Task } from "./objects/subObjects/task/task";

export interface Board {
  note: Note;
  post: Post;
  task: Task;
  boardCreatedByUser: string;
  boardName: string;
}
