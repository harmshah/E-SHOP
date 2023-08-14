import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'

import { ApiContext } from '../../contexts/apiContext'
import "react-multi-carousel/lib/styles.css";

import CardProduct from '../../components/CardProduct'
import Loading from '../../components/Loading'

import backWomen from '../../assets/backWomen.jpg'
import backMen from '../../assets/backMen.jpg'
import eletronics from '../../assets/eletronics.jpg'
import joiasBack from '../../assets/joias.png'
import biggest from '../../assets/biggest1.png'

import * as S from "./styles";

export default function Home() {

    const { allProducts, loading } = useContext(ApiContext)

    const [products, setProducts] = useState([])

    let productsHome = allProducts.slice(0, 8)

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <S.Container>
            <S.SeeProductsCards>
                <S.ProductCard>
                    <img src={backMen} alt="Imagem roupa masculina" />
                    <S.ContentProductCard>
                        <h1>Men's Clothing</h1>
\                        <Link to="/men">View Products</Link>
                    </S.ContentProductCard>
                </S.ProductCard>

                <S.ProductCard>
                    <img src={backWomen} alt="Imagem roupa feminina" />
                    <S.ContentProductCard>
                        <h1>Women's Clothing</h1>
\                        <Link to="/women">View Products</Link>
                    </S.ContentProductCard>
                </S.ProductCard>

                <S.ProductCard>
                    <img src={eletronics} alt="Imagem eletrônicos" />
                    <S.ContentProductCard>
                        <h1>Electronics</h1>
\                        <Link to="/electronics">View Products</Link>
                    </S.ContentProductCard>
                </S.ProductCard>

                <S.ProductCard>
                    <img src={joiasBack} alt="Imagem joias" />
                    <S.ContentProductCard>
                        <h1>Jewelery</h1>
\                        <Link to="/jewelery">View Products</Link>
                    </S.ContentProductCard>
                </S.ProductCard>
            </S.SeeProductsCards>

            <div>
                <img src={biggest} height={600} alt="Banner 1" />
            </div>


            <S.TitleProducts>
                <h1>Discover Our Top Products</h1>
                <p>Coming soon... New stock!</p>
            </S.TitleProducts>

            {loading ? (
                <Loading />
            ) : (

                <S.SomeProducts>
                    <ul>
                        {productsHome.map((item) => (
                            <>
                                <CardProduct
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    category={item.category}
                                    image={item.image}
                                    rating={item.rating}
                                />
                            </>
                        ))}
                    </ul>
                </S.SomeProducts>)}

            {loading === false && (
                <S.ButtonSeeAllProducts>
                    <Link to="/products">View All Products</Link>
                </S.ButtonSeeAllProducts>)}
        </S.Container>
    )
}