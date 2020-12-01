import { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Row, Col, Button } from 'reactstrap';

class ModalDetailOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: {}
    }
  }

  toggle = (data) => {
    this.setState({ open: !this.state.open, data })
  }
  
  closeModal = () => {
    this.toggle({})
  }

  cancelOrder = () => {
    const order = this.state.data
    fetch('http://localhost:3333/api/orders/' + order.order_id + '/cancel', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      this.closeModal()
    })
  }

  render() {
    const { data } = this.state;
    return (
      <Modal
        isOpen={this.state.open}
        toggle={this.toggle}
      >
        <ModalHeader>
          Order Detail
        </ModalHeader>
        <ModalBody>
          <label>OrderID: {data.order_id}</label><br />
          <label>Customer Name: {data.customer_name}</label><br />
          <label>Address: {data.address}</label><br />
          <label>Phone: {data.phone}</label><br />
          <label>Amount: {data.amount_money}$</label><br />
          <label>Delivary Date: {data.delivery_date}</label><br />
          <label>Status: {data.status}</label><br />
          <label></label><br />
        </ModalBody>
        <ModalFooter>
          {data.status !== 'cancelled' ?
            <Button color="danger"
              onClick={this.cancelOrder}
            >
              Cancel Order
            </Button> :
            ""
        }
          <Button
            color="secondary"
            onClick={this.closeModal}
          >Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalDetailOrder;
