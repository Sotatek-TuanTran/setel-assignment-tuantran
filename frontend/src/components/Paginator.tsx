import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export function Paginator({ currentPage, lastPage, paginate }: any) {
  return (
    <Pagination>
      { currentPage > 1 && <PaginationItem>
          <PaginationLink first onClick={() => paginate(1) }>
          </PaginationLink>
        </PaginationItem>}
      { currentPage > 1 && <PaginationItem >
          <PaginationLink previous onClick={() => paginate(parseInt(currentPage) - 1) }>
          </PaginationLink>
        </PaginationItem>}
      { currentPage - 2 >= 1 && <PaginationItem>
          <PaginationLink onClick={() => paginate(parseInt(currentPage) - 2) }>
            {currentPage - 2}
          </PaginationLink>
        </PaginationItem>}
      { currentPage - 1 >= 1 && <PaginationItem>
          <PaginationLink onClick={() => paginate(parseInt(currentPage) - 1) }>
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>}
      <PaginationItem active={true}>
        <PaginationLink>
          {currentPage}
        </PaginationLink>
      </PaginationItem>
      { currentPage + 1 <= lastPage && <PaginationItem>
          <PaginationLink onClick={() => paginate(parseInt(currentPage) + 1)}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>}
      { (currentPage + 2) <= lastPage && <PaginationItem>
          <PaginationLink onClick={() => paginate(parseInt(currentPage) + 2) }>
            {currentPage + 2}
          </PaginationLink>
        </PaginationItem>}
      {currentPage < lastPage && <PaginationItem>
          <PaginationLink next onClick={() => paginate(currentPage + 1) }>
          </PaginationLink>
        </PaginationItem>}
      { currentPage < lastPage && <PaginationItem>
          <PaginationLink last onClick={() => paginate(parseInt(lastPage)) }>
          </PaginationLink>
        </PaginationItem>}
    </Pagination>
  )
}
