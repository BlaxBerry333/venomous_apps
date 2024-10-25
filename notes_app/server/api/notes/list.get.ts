import { NoteModel, type NoteType } from "~/server/models";

export type QueriesType = {
  type: ""; // 笔记类型
  sort: string; // 排序字段
  order_by: "asc" | "desc"; // 升序或降序
  page: number; // 当前页数
  count: number; // 当前页的展示数量
};

export type ReturnType = {
  code: number;
  error: null | string;
  data: null | {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    notes: Array<NoteType>;
  };
};

/**
 * GET /api/notes/list
 *
 * @example
 * /api/notes/list?type=raft
 * /api/notes/list?sort=created_at&order_by=asc
 * /api/notes/list?page=1&count=10
 */
export default defineEventHandler(async (event) => {
  try {
    const searchQueries = getQuery(event) as QueriesType;

    const orderField = searchQueries?.sort || "created_at";
    const sortOption = searchQueries?.order_by === "asc" ? 1 : -1;

    const page = searchQueries?.page || 1;
    const count = searchQueries?.count || 10;
    const paginationSkip = (page - 1) * count;

    const totalCount = await NoteModel.countDocuments();

    const notes = await NoteModel.find()
      .sort({ [orderField]: sortOption })
      .skip(paginationSkip)
      .limit(count);

    return {
      code: 200,
      error: null,
      data: {
        totalCount,
        totalPages: Math.ceil(totalCount / count),
        currentPage: page,
        notes,
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
