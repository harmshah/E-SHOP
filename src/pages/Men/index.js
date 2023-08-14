import React, { useContext } from 'react';
import { ApiContext } from '../../contexts/apiContext'; // Import the ApiContext
import CardProduct from '../../components/CardProduct'; // Import the CardProduct component
import * as S from "./styles"; // Import styles from the styles module

export default function Men() {
    const { menProducts } = useContext(ApiContext); // Access menProducts from the context

    return (
        <>
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>Men</p>
            </S.Breadcrumb>

            <S.SomeProducts>
                <ul>
                    {menProducts.map((item) => (
                        <CardProduct
                            key={item.id} // Each mapped element should have a unique key
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
