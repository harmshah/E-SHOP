import React from 'react';
import * as S from './style';

export default function Footer() {
  return (
    <>
      <S.Container>
        <S.BottomFooter>
          <div className="createdBy">
            <span>Developed by <strong>Harmita Shah</strong></span>
          </div>
          <p>E-Shop - 2023. All rights reserved.</p>
        </S.BottomFooter>
      </S.Container>
    </>
  )
}