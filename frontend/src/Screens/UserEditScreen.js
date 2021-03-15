import React, {useEffect, useState} from 'react'
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import {useDispatch, useSelector} from "react-redux";
import {updateUser, userDetailsAction} from "../Actions/userActions";
import {USER_UPDATE_RESET} from "../Constants/userConstants";

export default function UserEditScreen(props) {

    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const userUpdate = useSelector(state => state.userUpdate);
    const {loading, error, user} = userDetails;
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;

    useEffect(() => {
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            props.history.push('/userList')
        }
        if (!user) {
            dispatch(userDetailsAction(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, props.history, successUpdate, user, userId])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id: userId, name, email, isSeller, isAdmin}));
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>
                        Edit User {name}
                    </h1>
                        {loadingUpdate && <LoadingBox/>}
                        {errorUpdate && <MessageBox variant="danger">{error}</MessageBox>}

                </div>
                {loading ? <LoadingBox/> :
                    (error ? <MessageBox variant="danger">{error}</MessageBox>
                        :
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" placeholder="Enter name" value={name}
                                       onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" placeholder="Enter email" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="isSeller">Is Seller</label>
                                <input id="isSeller" type="checkbox" checked={isSeller}
                                       onChange={(e) => setIsSeller(e.target.checked)}/>
                            </div>
                            <div>
                                <label htmlFor="isAdmin">Is Admin</label>
                                <input id="isAdmin" type="checkbox" checked={isAdmin}
                                       onChange={(e) => setIsAdmin(e.target.checked)}/>
                            </div>
                            <div>
                                <button type="submit" className="primary">Update</button>
                            </div>
                        </>)}
            </form>
        </div>
    )
}
         