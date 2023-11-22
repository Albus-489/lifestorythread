export interface IComment {
  comment: string;
  date: Date;
  time: string;
  created: number;
  changed: number;
  photo?: string;
  type: string;
}
