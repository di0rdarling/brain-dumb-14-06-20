import { boardTestData, noteTestData, postTestData, taskTestData } from "../testData/boardTestData"
import BoardMapper from '../domain/mappers/boardMapper';

describe('Tests the Board Mapper Class', () => {
    describe('Tests the mapToNoteModel function', () => {
        it('Correctly maps a board object to a note object', () => {

            let board = boardTestData;

            let expectedResult = noteTestData;

            let actualResult = BoardMapper.mapToNoteModel(board);
            expect(expectedResult).toMatchObject(actualResult)
        })
    })
    describe('Tests the mapToPostModel function', () => {
        it('Correctly maps a board object to a post object', () => {

            let board = boardTestData;

            let expectedResult = postTestData;

            let actualResult = BoardMapper.mapToPostModel(board);
            expect(expectedResult).toMatchObject(actualResult)
        })
    })
    describe('Tests the mapToTaskModel function', () => {
        it('Correctly maps a board object to a task object', () => {

            let board = boardTestData;

            let expectedResult = taskTestData;

            let actualResult = BoardMapper.mapToTaskModel(board);
            expect(expectedResult).toMatchObject(actualResult)
        })
    })
})