// Importing necessary dependencies and styles
import React from 'react';
import * as S from "./styles"; // Importing styles from a file
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; // Importing star icons from react-icons/bs

// Defining the Stars component
export default function Stars({ rate }) {
    return (
        <S.BoxStars> {/* Applying a styled component */}
            {/* Conditionally rendering stars based on the provided rate */}
            {rate === 'bad' && (
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                </>
            )}
            {rate === 'average' && (
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                </>
            )}
            {rate === 'good' && (
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                </>
            )}
            {rate === 'veryGood' && (
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                </>
            )}
            {rate === 'excellent' && (
                <>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                </>
            )}
        </S.BoxStars>
    );
}
