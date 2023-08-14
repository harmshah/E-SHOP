import React, { useState, useEffect } from 'react';
import * as S from "./styles"

import { Link} from 'react-router-dom'

import { FiMaximize2 } from 'react-icons/fi'

import Stars from '../../components/Stars'

export default function CardProduct({ id, title, price, description, category, image, rating }) {
    const [rate, setRate] = useState('')

    useEffect(() => {
        if (rating.rate <= 1) {
            setRate('terrible');
        } else if (1.1 <= rating.rate && rating.rate <= 1.9) {
            setRate('bad');
        } else if (2 <= rating.rate && rating.rate <= 2.9) {
            setRate('average');
        } else if (3 <= rating.rate && rating.rate <= 3.9) {
            setRate('good');
        } else if (3.9 <= rating.rate && rating.rate <= 4.5) {
            setRate('verygood');
        } else if (4.6 <= rating.rate && rating.rate <= 5) {
            setRate('excellent');
        }
    }, []);
    


    return (
        <S.CardProduct>
            <li key={id}>
    <img src={image} alt={`Image ${title}`} />
    <div className="contentInfo">
        <h2>{title}</h2>
        <strong>${price}</strong>
        <span>{rating.count} units</span>
        <div className="rateAndButton">
            <Stars rate={rate} />
            {rating.rate}
            <Link to={`/products/${id}`}><FiMaximize2 /> View</Link>
        </div>
    </div>
</li>

        </S.CardProduct>
    )
}