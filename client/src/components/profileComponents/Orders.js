import React from "react";
import Loading from './../LoadingError/Loading'
import Message from './../LoadingError/Error'
import {Link} from 'react-router-dom'
import moment from "moment";
const Orders = (props) => {
  const {order,loading,error} = props

  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? <Loading/> :  error ? <Message variant="alert-danger">{error}</Message> : <>{
        order && order.length ===0 ? ( <div className="col-12 alert alert-info text-center mt-3">
        No Orders
        <Link
          className="btn btn-success mx-2 px-3 py-2"
          to="/"
          style={{
            fontSize: "12px",
          }}
        >
          START SHOPPING
        </Link>
      </div> ) : ( <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {
              order &&
              order.map((item)=>{
                return(
                  <tr className={`${item.isPaid ? "alert-success" : "alert-danger"}`} key={item._id}>
              <td>
                <a href={`/order/${order._id}`} className="link">
                  {order._id}
                </a>
              </td>
              <td>{item.isPaid ? <>Paid</> : <>Not Paid</>}</td>
              <td>{item.isPaid ? moment(item.paidAt).calendar() : moment(item.createdAt).calendar()}</td>
              <td>${item.totalPrice}</td>
            </tr>
                )
              })
            }
            
            {/* Cancelled */}
            
          </tbody>
        </table>
      </div>)
      }</>}
      {/* <div className="col-12 alert alert-info text-center mt-3">
        No Orders
        <Link
          className="btn btn-success mx-2 px-3 py-2"
          to="/"
          style={{
            fontSize: "12px",
          }}
        >
          START SHOPPING
        </Link>
      </div> */}

     
    </div>
  );
};

export default Orders;
