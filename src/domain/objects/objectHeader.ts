import { Tag } from './tag';

/**
 * The header of the object.
 */
export interface ObjectHeader {
  id: number;

  createdDateTime: string,

  createdAuthor: string;

  content: string;

  tags?: Tag[]
}
