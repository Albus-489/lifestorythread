export interface IMark {
  _id: string,
  id: string,
  comment?: string,
  date: string,
  time: string,
  created: number,
  changed: number,
  photo?: string,
  grade?: number,
  type?: string,
}
