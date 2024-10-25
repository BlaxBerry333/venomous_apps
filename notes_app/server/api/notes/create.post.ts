import { NoteModel, type NoteType } from "~/server/models";

export type RequestBodyType = NoteType;

export type ReturnType = {
  code: number;
  error: null | string;
  data: null | {
    note: NoteType;
    message: string;
  };
};

/**
 * POST /api/notes/create
 */
export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as RequestBodyType;

    const existedNote = await NoteModel.findOne({
      title: body.title,
    });
    if (!!existedNote) {
      return {
        code: 409,
        error: "[409] Note already existed.",
        data: null,
      };
    }

    const createdNote = await NoteModel.create([
      {
        title: body.title,
        type: body.type,
      },
    ]);

    return {
      code: 201,
      error: null,
      data: {
        note: createdNote,
        message: "Note created successfully.",
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
