import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Button, Container } from 'reactstrap';
import { ListOrders } from './components/ListOrders';
import { ModalCreateOrder } from './components/modalCreateOrder';
import { useState } from 'react';

function App() {
  let [isOpenModalCreate, setIsOpenModalCreate ] = useState(false)
  let [hasNewOrder, setHasNewOrder] = useState(false)

  const toggleModalCreateOrder = () => {
    setIsOpenModalCreate(!isOpenModalCreate)
  }

  const onOrderCreated = () => {
    setHasNewOrder(!hasNewOrder)
  }

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
          onClick={toggleModalCreateOrder}
        >
          Create Order
        </Button>
      </Col>
      <Col xs="12" mt="2">
        <ListOrders 
          hasNewOrder={hasNewOrder} 
          onOrderCreated={onOrderCreated}
        />
      </Col>
    </Row>
     <ModalCreateOrder 
      onOrderCreated={onOrderCreated} 
      isOpen={isOpenModalCreate} 
      toggle={toggleModalCreateOrder}
    />
  </Container>
  )
}

export default App;
