import { IMark } from "./IMark";

export interface IDayDB {
  _id: string;
  marks: IMark[];
  day: string;
}
