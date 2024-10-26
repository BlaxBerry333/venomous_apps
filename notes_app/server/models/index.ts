import { model } from "mongoose";

import { NoteDataType } from "~/utils/types";
import { NoteSchema } from "../schemas";

export const NoteModel = model<NoteDataType>("Note", NoteSchema);
