import { Board } from "../domain/board";
var faker = require("faker");

export function getBoard(): Board {
  let board: Board = {
    boardName: "Test board",
    boardCreatedByUser: faker.name.findName(),
    notes: [{
      id: 1,
      createdAuthor: faker.name.findName(),
      createdDateTime: faker.date.past(),
      content: faker.lorem.sentence(),
      associatedLinks: [faker.lorem.sentence()],
      tags: [{
        name: faker.lorem.word(),
        colour: '#06D6A0'
      }]
    }, {
      id: 2,
      createdAuthor: faker.name.findName(),
      createdDateTime: faker.date.past(),
      content: faker.lorem.sentence(),
      associatedLinks: [faker.lorem.sentence()],
    }],
    tasks: [{
      id: 1,
      createdAuthor: faker.name.findName(),
      createdDateTime: faker.date.past(),
      content: faker.lorem.sentence(),
      taskLinks: [
        {
          task: faker.lorem.sentence(),
          taskContent: faker.lorem.sentence()
        }
      ],
      tags: [{
        name: faker.lorem.word(),
        colour: '#FFD166'
      }]
    }, {
      id: 2,
      createdAuthor: faker.name.findName(),
      createdDateTime: faker.date.past(),
      content: faker.lorem.sentence(),
      taskLinks: [
        {
          task: faker.lorem.sentence(),
          taskContent: faker.lorem.sentence()
        }
      ],
    }],
    posts: [{
      id: 1,
      createdAuthor: faker.name.findName(),
      createdDateTime: faker.date.past(),
      content: faker.lorem.sentence(),
      postTitle: faker.lorem.word(),
    }, {
      id: 2,
      createdAuthor: faker.name.findName(),
      createdDateTime: faker.date.past(),
      content: faker.lorem.sentence(),
      postTitle: faker.lorem.word(),
    }]
  };

  return board;
}
