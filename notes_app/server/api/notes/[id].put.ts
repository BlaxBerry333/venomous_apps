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
 * PUT /api/notes/[id]
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

    const body = (await readBody(event)) as RequestBodyType;

    const updatedNote = await NoteModel.findOneAndUpdate(
      { _id: noteId },
      {
        ...body,
        updated_at: new Date().toISOString(),
      },
      { new: true },
    );

    return {
      code: 200,
      error: null,
      data: {
        note: updatedNote,
        message: "Note updated successfully.",
      },
    };
  } catch (error) {
    return {
      code: 500,
      error: (error as Error).message,
      data: null,
    };
  }
});
