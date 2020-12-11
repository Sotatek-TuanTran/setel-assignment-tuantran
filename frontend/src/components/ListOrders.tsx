import { useState, useEffect } from 'react';
import { ListOrderItem } from './ListOrderItem';
import { Paginator } from './Paginator';
import { Table } from 'reactstrap';
import { ListOrdersProps, PaginateListOrders } from '../interfaces/props.interface';
const ORDER_API_URL: string = process.env.REACT_APP_ORDER_API_URL as string;

export function ListOrders(props: ListOrdersProps) {
  let [listOrders, setListOrders ] = useState<PaginateListOrders>({ page: 1, perPage: 10, lastPage: 1, total: 0, data: [] });
  let [currentPage, setCurrentPage ] = useState(1);
  const perPage = 10;

  const fetchOrders = () => {
    const url = ORDER_API_URL + '?page=' + currentPage + '&perPage=' + perPage;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setListOrders(result);
      }, (error) => {
        alert(`Has an error occurred! ${error}`)
      })
  }

  const paginate = (selectPage: number): void => {
    setCurrentPage(selectPage);
  }

  useEffect(() => {
    fetchOrders();
    if (props.hasNewOrder) {
      props.onOrderCreated()
    }
  }, [currentPage, props.hasNewOrder]);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>NO</th>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(listOrders.data) && listOrders.data.length ?
            listOrders.data.map((item: any, i: number) => 
              <ListOrderItem 
                key={'order-' + item.order_id} 
                data={item} index={i+1} 
                reloadList={fetchOrders}
              />
            ) : 
              <tr>
                <td colSpan={5} style={{ textAlign: 'center'}}>Data not found</td>
              </tr>
            
          }
        </tbody>
      </Table>
      <Paginator 
        paginate={paginate}
        currentPage={currentPage}
        lastPage={listOrders.lastPage}
      />
    </div>
  )
}
