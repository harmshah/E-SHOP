import React from 'react';
import { Link } from 'react-router-dom';

import error404Image from "../../assets/error.svg";

import * as S from "./styles";

export default function NotFound() {
    return (
        <>
            <S.ContainerMain>
                <img src={error404Image} alt="Error 404" />
                <p>
                    Sorry, but the page you're looking for doesn't exist.
                </p>
            </S.ContainerMain>

            <S.TitleProducts>
                <h1>You might be interested in the following products.</h1>
            </S.TitleProducts>

            <S.ButtonSeeAllProducts>
                <Link to="/">GO TO HOME</Link>
            </S.ButtonSeeAllProducts>
        </>
    );
}
