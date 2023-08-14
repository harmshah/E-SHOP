import React, { useContext } from 'react';

import { ApiContext } from '../../contexts/apiContext';


import * as S from "./styles";

export default function AboutUs() {
    const { menProducts } = useContext(ApiContext);

    return (
        <>
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>About Us</p>
            </S.Breadcrumb>

            <S.SeeProductsCards>
               
                <label style={{ marginBottom: '10px'}}>Welcome to e-shop! At e-shop, we take pride in presenting our exclusive collections, catering to a wide range of preferences. From cutting-edge electronics to exquisite jewelry, and from sophisticated men's clothing to elegant women's attire, we've curated a selection that meets diverse fashion needs.</label>
                <label style={{ marginBottom: '10px'}}>For those intrigued by the world of gadgets, our electronics collection offers the latest innovations to elevate your lifestyle. If you're in search of timeless elegance, our jewelry range adds a touch of luxury and refinement to your ensemble.
                Gentlemen, explore our meticulously tailored men's clothing that's designed to leave a lasting impression. And ladies, our women's clothing line is a celebration of style, with options ranging from classy to trendy, allowing you to express your individuality.</label>
                <label style={{ marginBottom: '10px'}}>At e-shop, we believe in celebrating uniqueness and grace, empowering you to redefine your personal style. So, as you embark on this journey of fashion exploration, we extend a warm invitation to experience the joy of shopping with us. Happy shopping to all, and thank you for choosing e-shop as your fashion destination! 🛍️</label>
                
            </S.SeeProductsCards>
        </>
    );
}
