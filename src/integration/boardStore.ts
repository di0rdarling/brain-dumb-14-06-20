import { Board } from "../domain/board";
import { ObjectType } from "../domain/objects/subObjects/objectType";
var faker = require("faker");

export function getBoard(): Board {
  let board: Board = {
    boardName: "Test board",
    boardCreatedByUser: faker.name.findName(),
    note: {
      id: 1,
      createdAuthor: faker.name.findName(),
      modifiedAuthor: faker.name.findName(),
      content: faker.lorem.sentence(),
      additionalNotes: faker.lorem.sentence(),
      objectType: ObjectType.NOTE
    },
    task: {
      id: 2,
      createdAuthor: faker.name.findName(),
      modifiedAuthor: faker.name.findName(),
      content: faker.lorem.sentence(),
      tag: faker.lorem.word(),
      taskLinks: [
        {
          task: faker.lorem.sentence(),
          taskContent: faker.lorem.sentence()
        }
      ],
      objectType: ObjectType.TASK
    },
    post: {
      id: 2,
      createdAuthor: faker.name.findName(),
      modifiedAuthor: faker.name.findName(),
      content: faker.lorem.sentence(),
      postTitle: faker.lorem.word(),
      objectType: ObjectType.POST
    }
  };

  return board;
}
