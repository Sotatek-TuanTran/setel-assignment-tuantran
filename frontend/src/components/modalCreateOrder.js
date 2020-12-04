import { 
  Modal,
  ModalHeader,
  ModalBody, 
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Button
} from 'reactstrap';
import { useState, useEffect } from 'react';

function ModalCreateOrder(props) {
  let [customerName, setCustomerName] = useState('')
  let [address, setAddress] = useState('');
  let [phone, setPhone] = useState('')
  let [deliveryDate, setDeliveryDate] = useState('')
  let [amountMoney, setAmountMoney] = useState(0);

  const submit = () => {
    const reqData = {
      customer_name: customerName,
      address: address,
      phone: phone,
      delivery_date: deliveryDate,
      amount_money: !Number.isNaN(amountMoney) ? parseFloat(amountMoney) : 0,
    }

    fetch('http://localhost:3333/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(reqData)
    }).then((res) => res.json())
    .then(result => {
      alert('Order was created successfully!')
      props.hasCreatedOrder()
      props.toggle()
    }, (err) => {
      alert('Order create fail!')
    })
  }

  return (
    <Modal 
      isOpen={props.isOpen}
      toggle={props.toggle}
    >
      <ModalHeader>
        Create Order
      </ModalHeader>
      <ModalBody>
        <form className="form form-horizontal">
          <FormGroup>
            <Label><b>Customer Name:</b></Label>
            <Input 
              type="text"
              name="customer_name" 
              value={customerName}
              placeholder="Enter customer name..."
              onChange={(e) => { setCustomerName(e.target.value) }}
            />
          </FormGroup>
          <FormGroup>
            <Label><b>Address:</b></Label>
            <Input 
              type="text" 
              name="address" 
              value={address}
              placeholder="Enter customer address..."
              onChange={(e) => { setAddress(e.target.value) }}
            />
          </FormGroup>
          <FormGroup>
            <Label><b>Phone:</b></Label>
            <Input 
              type="text" 
              name="phone" 
              value={phone}
              placeholder="Enter customer phone number..."
              onChange={(e) => { setPhone(e.target.value) }}
            />
          </FormGroup>
          <FormGroup>
            <Label><b>Delivery Date:</b></Label>
            <Input 
              type="date" 
              name="delivery_date" 
              value={deliveryDate}
              placeholder="Enter customer name..."
              onChange={(e) => { setDeliveryDate(e.target.value) }}
            />
          </FormGroup>
          <FormGroup>
            <Label><b>Amount of Money:</b></Label>
            <Input 
              type="number" 
              name="amount_money"
              value={amountMoney}
              placeholder="Enter Amount of money..."
              onChange={(e) => { setAmountMoney(e.target.value) }}
            />
          </FormGroup>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="success"
          onClick={submit}
        >Save</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalCreateOrder;