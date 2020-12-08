import { Badge } from 'reactstrap';

export function OrderStatus({ status }: any): any {
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
    case 'delivered':
      color = 'warning';
      break;
    default:
      color = 'default';
      break;
  }
  return (
    <Badge color={color}>{status}</Badge>
  )
  
}
