import { Table, Button, Badge, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Component } from 'react';
import ModalDetailOrder from './ModalDetailOrder';
class ListOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOrders: {
        page: 1,
        perPage: 10,
        total: 0,
        data: []
      },
      currentPage: 1,
      perPage: 10,
      openModalDetail: false
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchOrders()
    }
  }

  openModalDetailOrder = (selectedOrder) => {
    if (this.modalDetailOrder) {
      this.modalDetailOrder.toggle(selectedOrder)
    }
  }

  fetchOrders = () => {
    let { currentPage, perPage } = this.state;
    let url = 'http://localhost:3333/api/orders?page=' + currentPage + '&perPage=' + perPage;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          listOrders: result
        })
      }, (error) => {
        alert('Has an error occurred!')
        console.log('err', error);
      })
  }

  openModalDetailOrder = (selectedOrder) => {
    if (this.modalDetailOrder) {
      this.modalDetailOrder.toggle(selectedOrder)
    }
  }

  renderOrderStatus = (status) => {
    switch (status) {
      case 'created':
        return <Badge color="primary">Created</Badge>
      case 'cancelled':
        return <Badge color="danger">Cancelled</Badge>
      case 'confirmed':
        return <Badge color="success">Confirmed</Badge>
    }
  }

  paginate = (selectPage) => {
    this.setState({ currentPage: selectPage })
  }

  renderPagination = () => {
    let { currentPage } = this.state;
    const { total, perPage } = this.state.listOrders;
    const lastPage = total && total % perPage > 0 ? (Math.floor(total / perPage) + 1) : total / perPage;

    return (
      <Pagination>
        { currentPage > 1 && <PaginationItem>
            <PaginationLink first onClick={() => {
              this.paginate(1)
            }}>
            </PaginationLink>
          </PaginationItem>}
        { currentPage > 1 && <PaginationItem >
            <PaginationLink previous onClick={() => {
              this.paginate(currentPage - 1)
            }}>
            </PaginationLink>
          </PaginationItem>}
        { currentPage - 2 >= 1 && <PaginationItem>
            <PaginationLink onClick={() => this.paginate(currentPage - 2)}>
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>}
        { currentPage - 1 >= 1 && <PaginationItem>
            <PaginationLink onClick={() => this.paginate(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>}
        <PaginationItem active={true}>
          <PaginationLink>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        { currentPage + 1 <= lastPage && <PaginationItem>
            <PaginationLink onClick={() => this.paginate(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>}
        { (currentPage + 2) <= lastPage && <PaginationItem>
            <PaginationLink onClick={() => this.paginate(currentPage + 2)}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>}
        {currentPage < lastPage && <PaginationItem>
            <PaginationLink next onClick={() => this.paginate(currentPage + 1)}>
            </PaginationLink>
          </PaginationItem>}
        { currentPage < lastPage && <PaginationItem>
            <PaginationLink last onClick={() => this.paginate(lastPage)}>
            </PaginationLink>
          </PaginationItem>}
      </Pagination>
    )
  }

  render() {
    const { data = []} = this.state.listOrders;
    return (
      <div>
        <ModalDetailOrder ref={ref => this.modalDetailOrder = ref} reloadList={this.fetchOrders} />
        <Table>
          <thead>
            <tr>
              <th>NO</th>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={"orders-" + item.order_id}>
                  <td>{i+1}</td>
                  <td>{item.order_id}</td>
                  <td>{item.customer_name}</td>
                  <td>{this.renderOrderStatus(item.status)}</td>
                  <td>
                    <Button 
                      color="info" 
                      className="btn-sm"
                      onClick={() => {
                        this.openModalDetailOrder(item)
                      }}
                    >
                      &nbsp;...&nbsp;
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {this.renderPagination()}
      </div>
    );
  }
}

export default ListOrders;
