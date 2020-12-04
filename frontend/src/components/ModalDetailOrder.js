import { useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Label } from 'reactstrap';

function ModalDetailOrder(props) {
  let { isOpen, toggle, data } = props

  const cancelOrder = () => {
    fetch('http://localhost:3333/api/orders/' + data.order_id + '/cancel', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      props.reloadList();
      toggle(false)
    })
  }
  
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        Order Detail
      </ModalHeader>
      <ModalBody>
        <Label><b>Order ID:</b></Label>{data.order_id}<br/>
        <Label><b>Customer Name:</b></Label>{data.customer_name}<br/>
        <Label><b>Address:</b></Label>{data.address}<br/>
        <Label><b>Phone:</b></Label>{data.phone}<br/>
        <Label><b>Amount of money:</b></Label>{data.amount_money}$<br/>
        <Label><b>Delivery Date:</b></Label>{data.delivery_date}<br/>
        <Label><b>Status:</b></Label>{data.status}<br/>
      </ModalBody>
      <ModalFooter>
          <Button
            color="danger"
            onClick={() => { cancelOrder() }}
          >Cancel Order</Button>
        <Button
          color="secondary"
          onClick={() => {
            toggle()
          }}
        >Close</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalDetailOrder;
