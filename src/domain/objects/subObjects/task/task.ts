import { ObjectHeader } from "../../objectHeader";
import { TaskLinks } from "./taskLinks";

export interface Task extends ObjectHeader {
  taskLinks?: TaskLinks[];
}
