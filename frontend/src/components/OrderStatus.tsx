import { Badge } from 'reactstrap';
import { OrderStatusProps, OrderStatusEnum } from '../interfaces/props.interface';

export function OrderStatus(props: OrderStatusProps): any {
  const status: OrderStatusEnum | string = props.status;
  let color;
  switch(status) {
    case OrderStatusEnum.CREATED:
      color = 'primary';
      break;
    case OrderStatusEnum.CONFIRMED:
      color = 'success';
      break;
    case OrderStatusEnum.CANCELLED:
      color = 'danger'
      break;
    case OrderStatusEnum.DELIVERED:
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
