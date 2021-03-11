import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {detailsProduct, updateProduct} from "../Actions/productActions";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import {PRODUCT_UPDATE_RESET} from "../Constants/productConstants";
import Axios from "axios";

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;
    const productUpdate = useSelector(state => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;

    useEffect(() => {

        if (successUpdate) {
            props.history.push('/productlist');
        }

        if (!product || (product._id !== productId) || successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }
    }, [dispatch, product, productId, props.history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({_id: productId, name, price, image, category, brand, countInStock, description}));
    }

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try{
            const {data} = await Axios.post('/api/uploads', bodyFormData, {
                headers: {'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${userInfo.token}`},

            });
            setImage(data);
            setLoadingUpload(false);
        }catch(uploadError){
            setErrorUpload(uploadError.message);
            setLoadingUpload(false);
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1>Edit Product {productId}</h1></div>
                {loadingUpdate && <LoadingBox/>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {loading ? <LoadingBox/> : (error ? <MessageBox variant="danger">{error}</MessageBox>
                    : <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name"
                                   type="text"
                                   placeholder="Enter name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input id="price"
                                   type="text"
                                   placeholder="Enter price"
                                   value={price}
                                   onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input id="image"
                                   type="text"
                                   placeholder="Enter image"
                                   value={image}
                                   onChange={(e) => setImage(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="imageFile">Image File</label>
                            <input type="file" id="imageFile" label="Choose Image" onChange={uploadFileHandler}/>
                            {loadingUpload && <LoadingBox/>}
                            {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input id="category"
                                   type="text"
                                   placeholder="Enter category"
                                   value={category}
                                   onChange={(e) => setCategory(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="brand">Brand</label>
                            <input id="brand"
                                   type="text"
                                   placeholder="Enter brand"
                                   value={brand}
                                   onChange={(e) => setBrand(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input id="countInStock"
                                   type="text"
                                   placeholder="Enter stock count"
                                   value={countInStock}
                                   onChange={(e) => setCountInStock(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description"
                                      placeholder="Enter description"
                                      rows="3"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div>
                            <label/>
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>)}
            </form>
        </div>
    )
}
         