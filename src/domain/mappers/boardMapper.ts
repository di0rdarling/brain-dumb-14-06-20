import ObjectTypeMapper from "../mappers/objectTypeMapper";
import { Board } from "../board";
import { Task } from "../objects/subObjects/task/task";
import { Post } from "../objects/subObjects/post";
import { Note } from "../objects/subObjects/note";

export default class BoardMapper {
  static mapToPostModel(board: Board) {
    let post: Post = {
      id: board.post.id,
      content: board.post.content,
      postTitle: board.post.postTitle,
      createdAuthor: board.post.createdAuthor,
      modifiedAuthor: board.post.modifiedAuthor,
      objectType: board.post.objectType,
      subObjectDisplayValue: ObjectTypeMapper.getObjectTypeDisplayValue(
        board.post.objectType
      )
    };
    return post;
  }
  static mapToNoteModel(board: Board) {
    let note: Note = {
      id: board.note.id,
      content: board.note.content,
      additionalNotes: board.note.additionalNotes,
      createdAuthor: board.note.createdAuthor,
      modifiedAuthor: board.note.modifiedAuthor,
      objectType: board.note.objectType,
      subObjectDisplayValue: ObjectTypeMapper.getObjectTypeDisplayValue(
        board.note.objectType
      )
    };
    return note;
  }
  static mapToTaskModel(board: Board) {
    let task: Task = {
      id: board.task.id,
      content: board.task.content,
      tag: board.task.tag,
      taskLinks: board.task.taskLinks,
      createdAuthor: board.task.createdAuthor,
      modifiedAuthor: board.task.modifiedAuthor,
      objectType: board.task.objectType,
      subObjectDisplayValue: ObjectTypeMapper.getObjectTypeDisplayValue(
        board.task.objectType
      )
    };
    return task;
  }
}
