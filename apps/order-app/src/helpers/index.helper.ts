export function calcLastPage (total: number = 0, perPage: number = 10): number {
  return total
    ? (total % perPage != 0 
      ? Math.floor(total / perPage) + 1
      : total / perPage) 
    : 1;
}

export function calcSkipOffset(page: number = 1, perPage: number = 10): number {
  return page >= 1 ? ((page - 1) * perPage) : 0;
}