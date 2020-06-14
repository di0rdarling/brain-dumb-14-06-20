import { Board } from '../domain/board';
import { ObjectType } from '../domain/objects/subObjects/objectType';
import { Note } from '../domain/objects/subObjects/note';
import { Post } from '../domain/objects/subObjects/post';
import { Task } from '../domain/objects/subObjects/task/task';

export const boardTestData: Board = {
    boardName: "Test board Name",
    boardCreatedByUser: 'DevTester',
    note: {
        id: 1,
        createdAuthor: 'DevTester',
        modifiedAuthor: 'DevTester',
        content: 'This is some note content',
        additionalNotes: 'This is some addtional notes.',
        objectType: ObjectType.NOTE
    },
    task: {
        id: 2,
        createdAuthor: 'DevTester',
        modifiedAuthor: 'DevTester',
        content: 'This is some task content.',
        tag: 'This is a task tag.',
        taskLinks: [
            {
                task: 'This is a task link task',
                taskContent: 'This is a task link task content.'
            }
        ],
        objectType: ObjectType.TASK
    },
    post: {
        id: 2,
        createdAuthor: 'DevTester',
        modifiedAuthor: 'DevTester',
        content: 'This is some post content',
        postTitle: 'This is a post title',
        objectType: ObjectType.POST
    }
}

export const noteTestData: Note = {
    id: 1,
    createdAuthor: 'DevTester',
    modifiedAuthor: 'DevTester',
    content: 'This is some note content',
    additionalNotes: 'This is some addtional notes.',
    objectType: ObjectType.NOTE,
    subObjectDisplayValue: "Note"
}

export const taskTestData: Task = {
    id: 2,
    createdAuthor: 'DevTester',
    modifiedAuthor: 'DevTester',
    content: 'This is some task content.',
    tag: 'This is a task tag.',
    taskLinks: [
        {
            task: 'This is a task link task',
            taskContent: 'This is a task link task content.'
        }
    ],
    objectType: ObjectType.TASK,
    subObjectDisplayValue: 'Task'
}

export const postTestData: Post = {
    id: 2,
    createdAuthor: 'DevTester',
    modifiedAuthor: 'DevTester',
    content: 'This is some post content',
    postTitle: 'This is a post title',
    objectType: ObjectType.POST,
    subObjectDisplayValue: 'Post'
}