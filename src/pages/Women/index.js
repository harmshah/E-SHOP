import React, { useContext } from 'react';

import { ApiContext } from '../../contexts/apiContext'; // Import the ApiContext
import CardProduct from '../../components/CardProduct'; // Import the CardProduct component

import * as S from "./styles"; // Import styles from "./styles"

export default function Women() {
    const { womenProducts } = useContext(ApiContext); // Get womenProducts from the ApiContext

    return (
        <>
            {/* Breadcrumb */}
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>Women</p>
            </S.Breadcrumb>

            {/* Render womenProducts using CardProduct component */}
            <S.SomeProducts>
                <ul>
                    {womenProducts.map((item) => (
                        <CardProduct
                            key={item.id} // Provide a unique key for the component
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            category={item.category}
                            image={item.image}
                            rating={item.rating}
                        />
                    ))}
                </ul>
            </S.SomeProducts>
        </>
    );
}
