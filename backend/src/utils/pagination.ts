export function parsePagination(query: Record<string, unknown>) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 && limit <= 100 ? limit : 20;

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit
  };
}
