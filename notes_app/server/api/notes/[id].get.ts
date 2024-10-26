import { NoteModel } from "~/server/models";
import { NoteDataType } from "~/utils/types";

export type RequestBodyType = NoteDataType;

export type ReturnType = {
  code: number;
  error: null | string;
  data: null | {
    note: NoteDataType;
    message: string;
  };
};

/**
 * GET /api/notes/[id]
 */
export default defineEventHandler(async (event) => {
  try {
    const noteId = event.context.params?.id;
    if (!noteId) {
      return {
        code: 400,
        error: "[bad request] Note ID is required.",
        data: null,
      };
    }

    const note = await NoteModel.findOne({
      _id: noteId,
    });
    if (!note) {
      return {
        code: 404,
        error: "[404] Note not found.",
        data: null,
      };
    }

    return {
      code: 200,
      error: null,
      data: {
        note,
      },
    };
  } catch (error) {
    return error;
  }
});
