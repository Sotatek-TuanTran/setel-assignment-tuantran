import { Table, Button, Badge } from 'reactstrap';
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
      openModalDetail: false
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  openModalDetailOrder = (selectedOrder) => {
    if (this.modalDetailOrder) {
      this.modalDetailOrder.toggle(selectedOrder)
    }
  }

  fetchOrders = () => {
    fetch('http://localhost:3333/api/orders', {
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

  render() {
    const { data = []} = this.state.listOrders;
    return (
      <div>
        <ModalDetailOrder ref={ref => this.modalDetailOrder = ref} />
        <Table>
          <thead>
            <tr>
              <th>No</th>
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
      </div>
    );
  }
}

export default ListOrders;
