import React from 'react';
import * as S from "./styles";
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

export default function Stars({ rate }) {
    return (
        <S.BoxStars>
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
    )
}
