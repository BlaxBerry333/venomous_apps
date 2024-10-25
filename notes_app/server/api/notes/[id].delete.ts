import { NoteModel, type NoteType } from "~/server/models";

export type ReturnType = {
  code: number;
  error: null | string;
  data: null | {
    note: NoteType;
    message: string;
  };
};

/**
 * DELETE /api/notes/[id]
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

    const deletedNote = await NoteModel.findOneAndDelete({
      _id: noteId,
    });
    if (!deletedNote) {
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
        note: deletedNote,
        message: "Note deleted successfully.",
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
