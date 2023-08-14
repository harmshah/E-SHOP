import React, { useContext } from 'react';

import { ApiContext } from '../../contexts/apiContext'; // Import the ApiContext for accessing product data

import CardProduct from '../../components/CardProduct'; // Import the CardProduct component for rendering individual products

import * as S from "./styles"; // Import styled components

export default function Products() {
    const { allProducts } = useContext(ApiContext); // Use the useContext hook to access the allProducts data from ApiContext

    return (
        <>
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>Products</p>
            </S.Breadcrumb>

            <S.AllProducts>
                <ul>
                    {allProducts.map((item) => (
                        <CardProduct
                            key={item.id} // Use the 'id' as the 'key' for each CardProduct
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            category={item.category}
                            image={item.image}
                            rating={item.rating}
                        />
                    ))}
                </ul>
            </S.AllProducts>
        </>
    );
}
