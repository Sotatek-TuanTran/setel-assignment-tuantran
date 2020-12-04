import { useState, useEffect } from 'react';
import ListOrderItem from './ListOrderItem';
import Paginator from './Paginator';
import { Table } from 'reactstrap';

function ListOrders(props) {
  let [listOrders, setListOrders ] = useState({ page: 1, perPage: 10, total: 0, data: [] });
  let [currentPage, setCurrentPage ] = useState(1);
  let [ perPage, setPerPage ] = useState(10);
  let [lastPage, setLastPage ] = useState(1)

  function fetchOrders() {
    const url = 'http://localhost:3333/api/orders?page=' + currentPage + '&perPage=' + perPage;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setListOrders(result);
        let numPage = result.total && result.total % perPage > 0 ? Math.floor(result.total / perPage) + 1 : Math.floor(result.total / perPage);
        setLastPage(numPage);
      }, (error) => {
        alert('Has an error occurred!', error)
      })
  }

  const paginate = (selectPage) => {
    setCurrentPage(selectPage);
  }

  useEffect(() => {
    fetchOrders();
    if (props.hasNewOrder) {
      props.hasCreatedOrder()
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
          {(listOrders.data || []).map((item, i) => {
            return <ListOrderItem key={'order-' + item.order_id} data={item} index={i+1} reloadList={fetchOrders} />
          })}
        </tbody>
      </Table>
      <Paginator paginate={paginate} currentPage={parseInt(currentPage)} lastPage={lastPage} />
    </div>
  )
}

export default ListOrders;
