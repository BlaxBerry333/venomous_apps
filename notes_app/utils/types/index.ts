export enum SelectableNoteType {
  raft = "raft",
}

export type NoteDataType = {
  _id: string;
  title: string;
  type: SelectableNoteType;
  created_at: Date;
  updated_at: Date;
};
