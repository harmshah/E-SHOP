import styled from 'styled-components'
import theme from '../../styles/theme'

export const Breadcrumb = styled.div`
    display: flex;
    width: 80%;
    margin: 1.5rem auto;
    gap: 5px;
    font-size: 15px;

    a {
        color: ${theme.black};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }

    p {
        font-weight: ${theme.fonts.weight.bolder};
    }

    @media (max-width: 510px){
        width: 100%;
        margin: 1.5rem 10px;
        font-size: 12px;
    }
`

export const SomeProducts = styled.div`
    display: flex;
    width: 80vw;
    height: 100%;
    margin: 3rem auto 0 auto;

    ul {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5rem;

        a {
            color: ${theme.black};
        }
    }
`

export const Container = styled.div`
    .CarouselBanner {
        width: 100vw;
        margin-bottom: 30px; 

        img {
            width: 100%;
            height: 100%;
        }
    }
`
export const SeeProductsCards = styled.div`
    display: flex;
    max-width: 95vw;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2rem auto 2rem auto;
    gap: 1rem;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
`