import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ApiContext } from '../../contexts/apiContext'; // Import the ApiContext for accessing product data
import api from '../../services/api'; // Import the API service for making requests

import { toast } from 'react-toastify'; // Import toast notifications for user feedback
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

import { FiShoppingCart } from 'react-icons/fi'; // Import the shopping cart icon

import Loading from '../../components/Loading'; // Import the Loading component

import * as S from "./styles"; // Import styled components from './styles'

export default function Inspect(props) {
    const history = useHistory(); // Initialize useHistory for navigation
    const { allProducts } = useContext(ApiContext); // Access product data from ApiContext

    const id = props.match.params.id; // Get the product ID from the URL parameter
    const index = parseInt(id); // Convert the ID to an integer

    const [product, setProduct] = useState({}); // Initialize state for the selected product
    const [loading, setLoading] = useState(false); // Initialize loading state
    const [quantity, setQuantity] = useState(1); // Initialize state for the quantity of the product

    useEffect(() => {
        async function loadProduct() {
            setLoading(true);
            const response = await api.get(`products/${index}`); // Fetch the product data from the API

            if (response.data === null) {
                history.replace('/'); // Redirect to the home page if the product doesn't exist
                return;
            }

            let p = {
                category: response.data.category,
                description: response.data.description,
                id: response.data.id,
                image: response.data.image,
                price: response.data.price,
                rating: response.data.rating,
                title: response.data.title,
                quantity: 1 // Set the initial quantity to 1
            };

            setProduct(p); // Set the fetched product data
            setLoading(false); // Finish loading
        }

        loadProduct(); // Call the function to load the product data
    }, []);

    // Function to add the product to the cart
    function addItemOnCart() {
        const myList = localStorage.getItem('products');
        let savedProducts = JSON.parse(myList) || [];
        const hasProduct = savedProducts.some(
            (savedProduct) => savedProduct.id === product.id
        );

        if (hasProduct) {
            // Show a toast notification if the product is already in the cart
            toast.info('This product is already in the cart.', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        savedProducts.push(product); // Add the product to the cart
        localStorage.setItem('products', JSON.stringify(savedProducts));
        // Show a toast notification for adding the product to the cart
        toast.success('Product added to the cart!', {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    // Function to decrease the quantity of the product
    function removeQuantity() {
        if (product.quantity === 0) {
            return; // Prevent negative quantity
        }
        product.quantity -= 1; // Decrease the quantity
        setQuantity(quantity - 1); // Update the state
    }

    // Function to increase the quantity of the product
    function addQuantity() {
        product.quantity += 1; // Increase the quantity
        setQuantity(quantity + 1); // Update the state
    }

    // Render the component elements
    return (
        <>
            <S.Breadcrumb>
                <Link to='/'>Home</Link>
                <span>/</span>
                <Link to="/products">Products</Link>
                <span>/</span>
                <p>{product.title}</p>
            </S.Breadcrumb>

            {loading && <Loading />} {/* Display loading spinner if loading is true */}

            {!loading && (
                <S.InspectItem>
                    <S.ImageProduct>
                        <img src={product.image} alt={product.title} />
                    </S.ImageProduct>

                    <S.InfoProduct>
                        <S.TitleCompany>E-Shop</S.TitleCompany>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <span>${product.price}</span>
                        <S.Purchase>
                            <div className="quantity">
                                <button type="button" onClick={removeQuantity}>-</button>
                                <input type="text" value={quantity} readOnly />
                                <button type="button" onClick={addQuantity}>+</button>
                            </div>
                            <button className="buttonPurchase" onClick={addItemOnCart}>
                                <FiShoppingCart /> Add to Cart
                            </button>
                        </S.Purchase>
                    </S.InfoProduct>
                </S.InspectItem>
            )}
        </>
    );
}
