import { 
  Modal,
  ModalHeader,
  ModalBody, 
  ModalFooter, 
  Row, 
  Col,
  Label,
  FormGroup,
  Input,
  Button } from 'reactstrap';
import { Component } from 'react';
class ModalCreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  toggle = () => {
    this.setState({ show: !this.state.show });
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
            <Label><b>Customer Name:</b></Label>
            <Input type="text" name="customer_name" placeholder="Enter customer name..." />
            <Label><b>Address:</b></Label>
            <Input type="text" name="address" placeholder="Enter customer address..." />
            <Label><b>Phone:</b></Label>
            <Input type="text" name="phone" placeholder="Enter customer phone number..." />
            <Label><b>Delivery Date:</b></Label>
            <Input type="date" name="delivery_date" placeholder="Enter customer name..." />
            <Label><b>Amount of Money:</b></Label>
            <Input type="number" name="amount_money" placeholder="Enter Amount of money..." />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="success">Save</Button>
        </ModalFooter>
      </Modal>
    );
  }

}

export default ModalCreateOrder;