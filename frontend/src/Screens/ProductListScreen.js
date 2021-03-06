import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {createProduct, deleteProduct, listProducts} from "../Actions/productActions";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import {PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET} from "../Constants/productConstants";

export default function ProductListScreen(props) {
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const productCreate = useSelector(state => state.productCreate);
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate;
    const dispatch = useDispatch();

    const productDelete = useSelector((state)=> state.deleteProduct);

    const {
        loading:loadingDelete,
        error:errorDelete,
        success: successDelete
    } = productDelete;
    useEffect(() => {
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET})
        }
        dispatch(listProducts());
    },[createdProduct, dispatch, props.history, successCreate, successDelete])
    const deleteHandler = (product) =>{
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteProduct(product));
        }
    }
    const createProductHandler =() => {
        dispatch(createProduct());
    }
    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button"
                className="primary"
                        onClick={createProductHandler}
                >Create Product</button>
            </div>
            {loadingCreate && <LoadingBox/>}
            {errorCreate && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loadingDelete && <LoadingBox/>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? <LoadingBox/>
                : error ? <MessageBox variant="danger">{error}</MessageBox>
                    : <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button type="button"
                                            className="small"
                                            onClick={() => props.history.push(`/product/${product._id}/edit`)}>Edit
                                    </button>
                                    <button type="button"
                                            className="small"
                                            onClick={()=> deleteHandler(product)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>}
        </div>
    )
}
