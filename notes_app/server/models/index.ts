import { model } from "mongoose";
import { NoteSchema } from "../schemas";

export type NoteType = {
  _id: string;
  title: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

export const NoteModel = model<NoteType>("Note", NoteSchema);
