import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

import error404Image from "../../assets/error.svg"; // Import the error404Image
import * as S from "./styles"; // Import styles from the styles module

export default function NotFound() {
    return (
        <>
            <S.ContainerMain>
                <img src={error404Image} alt="Error 404" /> {/* Display the error image */}
                <p>
                    Sorry, but the page you're looking for doesn't exist.
                </p>
            </S.ContainerMain>

            <S.TitleProducts>
                <h1>You might be interested in the following products.</h1>
            </S.TitleProducts>

            <S.ButtonSeeAllProducts>
                <Link to="/">GO TO HOME</Link> {/* Link to navigate back to the home page */}
            </S.ButtonSeeAllProducts>
        </>
    );
}
