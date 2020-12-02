import { 
  Modal,
  ModalHeader,
  ModalBody, 
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Button } from 'reactstrap';
import { Component } from 'react';
class ModalCreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      customer_name: '',
      address: '',
      phone: '',
      delivery_date: '',
      amount_money: 0
    }
  }

  toggle = () => {
    this.setState({ show: !this.state.show });
  }

  changeCustomerNameInput = (e) => {
    const customerName = e.target.value ? e.target.value : '';
    this.setState({ customer_name: customerName });
  }

  changeAddressInput = (e) => {
    const address = e.target.value ? e.target.value : '';
    this.setState({ address: address });
  }

  changePhoneInput = (e) => {
    const phone = e.target.value ? e.target.value : '';
    this.setState({ phone: phone });
  }

  changeDeliveryDateInput = (e) => {
    const deliveryDate = e.target.value ? e.target.value : '';
    this.setState({ delivery_date: deliveryDate });
  }

  changeAmountMoneyInput = (e) => {
    const amountMoney = !Number.isNaN(e.target.value) ? parseFloat(e.target.value) : 0;
    this.setState({ amount_money: amountMoney });
  }

  submit = () => {
    const reqData = {
      customer_name: this.state.customer_name,
      address: this.state.address,
      phone: this.state.phone,
      delivery_date: this.state.delivery_date,
      amount_money: this.state.amount_money
    }

    fetch('http://localhost:3333/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(reqData)
    }).then((res) => res.json())
    .then(result => {
      alert('Order was created successfully!')
      this.props.reloadListOrder()
      this.toggle()
    }, (err) => {
      alert('Order create fail!')
    })
  }

  render() {
    return (
      <Modal 
        isOpen={this.state.show}
        toggle={this.toggle}
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
                value={this.state.customer_name}
                placeholder="Enter customer name..."
                onChange={this.changeCustomerNameInput}
              />
            </FormGroup>
            <FormGroup>
              <Label><b>Address:</b></Label>
              <Input 
                type="text" 
                name="address" 
                value={this.state.address}
                placeholder="Enter customer address..."
                onChange={this.changeAddressInput}
              />
            </FormGroup>
            <FormGroup>
              <Label><b>Phone:</b></Label>
              <Input 
                type="text" 
                name="phone" 
                value={this.state.phone}
                placeholder="Enter customer phone number..."
                onChange={this.changePhoneInput}
              />
            </FormGroup>
            <FormGroup>
              <Label><b>Delivery Date:</b></Label>
              <Input 
                type="date" 
                name="delivery_date" 
                value={this.state.delivery_date}
                placeholder="Enter customer name..."
                onChange={this.changeDeliveryDateInput}
              />
            </FormGroup>
            <FormGroup>
              <Label><b>Amount of Money:</b></Label>
              <Input 
                type="number" 
                name="amount_money"
                value={this.state.amount_money}
                placeholder="Enter Amount of money..."
                onChange={this.changeAmountMoneyInput}
              />
            </FormGroup>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="success"
            onClick={this.submit}
          >Save</Button>
        </ModalFooter>
      </Modal>
    );
  }

}

export default ModalCreateOrder;