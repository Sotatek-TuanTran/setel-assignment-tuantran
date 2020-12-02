import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Button, Container } from 'reactstrap';
import React, { Component } from 'react';
import ListOrders from './components/ListOrders';
import ModalCreateOrder from './components/modalCreateOrder';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrder: {}
    }
  }

  openModalCreateOrder = () => {
    if (this.modalCreateOrder) {
      this.modalCreateOrder.toggle()
    }
  }

  reloadListOrders = () => {
    if (this.listOrdersEl) {
      this.listOrdersEl.fetchOrders()
    }
  }
  

  render() {
    return (
      <Container>
        <Row>
          <Col xs="12">
            <h2>Setel Assignment</h2>
          </Col>
          <Col xs="12" className="pb-2 pull-right">
            <Button 
              className="float-right mb-3" 
              color="primary"
              onClick={this.openModalCreateOrder}
            >
              Create Order
            </Button>
          </Col>
          <Col xs="12" mt="2">
            <ListOrders ref={ref => this.listOrdersEl = ref} />
          </Col>
        </Row>
         <ModalCreateOrder reloadListOrder={this.reloadListOrders} ref={ref => this.modalCreateOrder = ref} />
      </Container>
    )
  }
}

export default App;
