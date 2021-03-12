import React, {useEffect} from 'react'
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, listUsers} from "../Actions/userActions";

export default function UserListScreen() {

    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const userDelete = useSelector(state=>state.userDelete);
    const {loading:deleteUserLoading, error:deleteUserError, success:deleteUserSuccess} = userDelete;
    const {loading, error, users} = userList;
    useEffect(()=>{
        dispatch(listUsers());
    },[dispatch, deleteUserSuccess])
    const userDeleteHandler = (user) => {
        if(window.confirm('Are you sure you want to delete the user?')){
            dispatch(deleteUser(user._id));
        }
    }

    return (
          <div>
          <h1>Users</h1>
              {deleteUserLoading && <LoadingBox/>}
              {deleteUserError && <MessageBox variant="danger">{deleteUserError}</MessageBox>}
              {deleteUserSuccess && <MessageBox variant="success">User successfully deleted</MessageBox>}
              {  loading ? <LoadingBox/>
                  : error? <MessageBox variant="danger">{error}</MessageBox>
                      :(
                          <table className="table">
                              <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>IS SELLER</th>
                                    <th>IS ADMIN</th>
                                    <th>ACTIONS</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                  users.map((user) => (
                                      <tr key={user._id}>
                                          <td>{user._id}</td>
                                          <td>{user.name}</td>
                                          <td>{user.email}</td>
                                          <td>{user.isSeller ? 'YES' : 'NO'}</td>
                                          <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                          <td>
                                              <button
                                                  type="button"
                                                  className="small">Edit</button>
                                              <button
                                                  type="button"
                                                  className="small"
                                                  onClick={() => userDeleteHandler(user)}>Delete</button>
                                          </td>
                                      </tr>
                                  ))
                              }
                              </tbody>
                          </table>
                      )
              }
          </div>
        )
      }
