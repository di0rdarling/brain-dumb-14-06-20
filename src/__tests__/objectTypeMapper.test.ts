import ObjectTypeMapper from '../domain/mappers/objectTypeMapper';
import { ObjectType } from '../domain/objects/subObjects/objectType';
import { ObjectTypeDisplayValue } from '../domain/objects/displayValues/objectTypeDisplayValue';

describe('Tests the Object Type Mapper Class', () => {
    it('Correctly maps a Note Object Type to a Note Object Type display value. ', () => {

        let expectedResult = ObjectTypeDisplayValue.NOTE
        let actualResult = ObjectTypeMapper.getObjectTypeDisplayValue(ObjectType.NOTE)
        expect(expectedResult).toMatch(actualResult)

    })
    it('Correctly maps a Post Object Type to a Post Object Type display value. ', () => {

        let expectedResult = ObjectTypeDisplayValue.POST
        let actualResult = ObjectTypeMapper.getObjectTypeDisplayValue(ObjectType.POST)
        expect(expectedResult).toMatch(actualResult)

    })
    it('Correctly maps a Task Object Type to a Task Object Type display value. ', () => {

        let expectedResult = ObjectTypeDisplayValue.TASK
        let actualResult = ObjectTypeMapper.getObjectTypeDisplayValue(ObjectType.TASK)
        expect(expectedResult).toMatch(actualResult)

    })
})