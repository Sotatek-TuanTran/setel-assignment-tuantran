import { useState } from 'react';
import { Button } from 'reactstrap';
import { ModalDetailOrder } from './ModalDetailOrder';
import { OrderStatus }  from './OrderStatus';

export function ListOrderItem({ index, data, reloadList }: any) {
  let [isOpenModalDetail, setIsOpenModalDetail] = useState(false)
  const toggleModalDetail = (): void => {
    setIsOpenModalDetail(!isOpenModalDetail);
  }
  return (
    <tr>
      <td>{index}</td>
      <td>{data.order_id}</td>
      <td>{data.customer_name}</td>
      <td>
        <OrderStatus status={data.status} />
      </td>
      <td>
        <Button
          className="btn-sm"
          color="info"
          onClick={() => {
            toggleModalDetail()
          }}
        >&nbsp;...&nbsp;
        </Button>
      </td>
      <ModalDetailOrder isOpen={isOpenModalDetail} toggle={toggleModalDetail} data={data} reloadList={reloadList} />
    </tr>
  )
}