// Importing necessary dependencies and components
import React, { useState, useEffect } from 'react';
import * as S from "./styles" // Importing styles from a file

import { Link } from 'react-router-dom' // Importing Link component from react-router-dom

import { FiMaximize2 } from 'react-icons/fi' // Importing an icon component

import Stars from '../../components/Stars' // Importing a custom Stars component

// Defining the CardProduct component
export default function CardProduct({ id, title, price, description, category, image, rating }) {
    const [rate, setRate] = useState(''); // State for rating label

    useEffect(() => {
        // Effect to calculate and set rating label based on the rating value
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

    // Rendering the component
    return (
        <S.CardProduct> {/* Applying a styled component */}
            <li key={id}>
                <img src={image} alt={`Image ${title}`} /> {/* Displaying the product image */}
                <div className="contentInfo">
                    <h2>{title}</h2> {/* Displaying the product title */}
                    <strong>${price}</strong> {/* Displaying the product price */}
                    <span>{rating.count} units</span> {/* Displaying the unit count */}
                    <div className="rateAndButton">
                        <Stars rate={rate} /> {/* Using the Stars component to display a rating */}
                        {rating.rate} {/* Displaying the numeric rating */}
                        <Link to={`/products/${id}`}>
                            <FiMaximize2 /> View {/* Link to view more details */}
                        </Link>
                    </div>
                </div>
            </li>
        </S.CardProduct>
    );
}
