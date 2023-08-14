// Importing necessary dependencies and styles
import React from 'react';
import * as S from './style'; // Importing styles from a file

// Defining the Footer component
export default function Footer() {
  return (
    <>
      {/* Container for the footer */}
      <S.Container>
        {/* Bottom footer section */}
        <S.BottomFooter>
          <div className="createdBy">
            {/* Text indicating the developer's name */}
            <span>Developed by <strong>Harmita Shah</strong></span>
          </div>
          {/* Copyright notice */}
          <p>E-Shop - 2023. All rights reserved.</p>
        </S.BottomFooter>
      </S.Container>
    </>
  );
}
