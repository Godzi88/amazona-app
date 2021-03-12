import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, listOrders} from "../Actions/orderActions";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import {ORDER_DELETE_RESET} from "../Constants/orderConstants";

export default function OrderListScreen(props) {

    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;
    const dispatch = useDispatch();
    const orderDelete = useSelector(state => state.orderDelete);
    const {loading:loadingOrderDelete, error:errorOrderDelete, success: successOrderDelete} = orderDelete;

    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET})
        dispatch(listOrders());
    }, [dispatch, successOrderDelete])

    const deleteHandler = (order) => {
        if(window.confirm('Are you sure you want to delete this order?')){
            dispatch(deleteOrder(order._id))
        }
    }
    return (
        <div>
            <h1>Orders</h1>
            {successOrderDelete && <MessageBox variant="success">Order successfully deleted</MessageBox>}
            {loadingOrderDelete && <LoadingBox/>}
            {errorOrderDelete && <MessageBox variant="danger">{errorOrderDelete}</MessageBox>}
            {loading ? <LoadingBox/> :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <table className="table">
                            <thead>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'NO'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'NO'}</td>
                                    <td>
                                        <button type="button" className="small"
                                                onClick={() => {
                                                    props.history.push(`/order/${order._id}`)
                                                }}>Details
                                        </button>
                                        <button type="button" className="small" onClick={() => deleteHandler(order)}>
                                        Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
        </div>
    )
}
