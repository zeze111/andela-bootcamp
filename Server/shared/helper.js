const paginationData = (count, limit, offset) => ({
  pageSize: limit,
  totalCount: count,
  page: Math.ceil(offset / limit) + 1,
  pageCount:  Math.ceil(count / limit),
});

export default paginationData;
