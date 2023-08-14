// Importing necessary dependencies and styles
import React, { useContext } from 'react';
import { ApiContext } from '../../contexts/apiContext'; // Importing the ApiContext
import CardProduct from '../../components/CardProduct'; // Importing the CardProduct component
import * as S from "./styles"; // Importing styles from a file

// Defining the Electronics component
export default function Electronics() {
    const { electronicsProducts } = useContext(ApiContext); // Using the ApiContext to get electronicsProducts

    return (
        <>
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>Electronics</p>
            </S.Breadcrumb>

            <S.SomeProducts>
                <ul>
                    {/* Rendering each electronics product using the CardProduct component */}
                    {electronicsProducts.map((item) => (
                        <CardProduct
                            key={item.id}
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
