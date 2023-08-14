// Importing necessary dependencies and styles
import React, { useEffect, useState, createContext } from 'react';
import api from '../services/api'

// Creating the ApiContext to use for providing data
export const ApiContext = createContext({})

// Defining the ApiProvider component
export const ApiProvider = ({ children }) => {

    const [allProducts, setAllProducts] = useState([])
    const [menProducts, setMenProducts] = useState([])
    const [jeweleryProducts, setJeweleryProducts] = useState([])
    const [electronicsProducts, setElectronicsProducts] = useState([])
    const [womenProducts, setWomenProducts] = useState([]);
 
    // Loading state variable to indicate API loading status
    const [loading, setLoading] = useState(true);

    // Fetching data from the API using useEffect
    useEffect(() => {
        setLoading(true)
        api
        .get('/products')
        .then( (response) => {
            setAllProducts([... response.data])
            setLoading(false)
        })
        .catch((err) => {
            alert('false')
            setLoading(false)
        })
    }, [])

    // Fetching products by category
    useEffect(() => {
        api
        .get(`/products/category/${encodeURIComponent("men's clothing")}`)
        .then( (response) => {
            setMenProducts([... response.data])
        })
        .catch((err) => {
            alert('false')
        })
    }, []) 

    useEffect(() => {
        api
        .get(`/products/category/women's%20clothing`)
        .then( (response) => {
            setWomenProducts([... response.data])
        })
        .catch((err) => {
            console.log(err)
            alert('false')
        })
    }, []) 

    useEffect(() => {
        api
        .get(`/products/category/jewelery`)
        .then( (response) => {
            setJeweleryProducts([... response.data])
        })
        .catch((err) => {
            console.log(err)
            alert('false')
        })
    }, [])
    
    useEffect(() => {
        api
        .get(`/products/category/electronics`)
        .then( (response) => {
            setElectronicsProducts([... response.data])
        })
        .catch((err) => {
            console.log(err)
            alert('false')
        })
    }, [])

    return (
        // Providing the context values to child components
        <ApiContext.Provider
            value={{
                allProducts,
                menProducts,
                jeweleryProducts,
                electronicsProducts,
                womenProducts,
                loading
            }} >
            {children}
        </ApiContext.Provider>
    )
}