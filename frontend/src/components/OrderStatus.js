import { Badge } from 'reactstrap';

function OrderStatus({ status }) {
  let color;
  switch(status) {
    case 'created':
      color = 'primary';
      break;
    case 'confirmed':
      color = 'success';
      break;
    case 'cancelled':
      color = 'danger'
      break;
  }
  return (
    <Badge color={color}>{status}</Badge>
  )
}
export default OrderStatus;
