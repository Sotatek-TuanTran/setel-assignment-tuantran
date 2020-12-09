import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Label } from 'reactstrap';
import { ModalDetailOrderProps } from '../interfaces/props.interface';
const ORDER_API_URL: string = process.env.REACT_APP_ORDER_API_URL as string;

export function ModalDetailOrder(props: ModalDetailOrderProps) {
  let { isOpen, toggle, data } = props

  const cancelOrder = () => {
    const url = ORDER_API_URL + '/' + data.order_id + '/cancel'
    fetch(url, {
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
          {data.status !== 'cancelled' && data.status !== 'delivered' &&
            <Button
              color="danger"
              onClick={cancelOrder}
            >Cancel Order</Button>
          }
        <Button
          color="secondary"
          onClick={toggle}
        >Close</Button>
      </ModalFooter>
    </Modal>
  )
}
