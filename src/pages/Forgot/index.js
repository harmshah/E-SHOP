import React from 'react';
import { useForm } from "react-hook-form"; // Import the useForm hook for managing form state
import { yupResolver } from '@hookform/resolvers/yup'; // Import yupResolver for schema-based validation
import * as yup from "yup"; // Import the yup library for data validation

import * as S from "./styles"; // Import styled components from './styles'

// Define the validation schema using yup
const schema = yup
    .object({
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
    })
    .required();

// Define the Forgot component
export default function Forgot() {

    // Initialize useForm hook to manage form state and validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), // Apply the validation schema to the form
    });

    // Function to be called on form submission
    function onSubmit(userData) {
        console.log(userData); // Log the form data to the console
    }

    // Render the component elements
    return (
        <>

            <S.ContainerMain>
                {/* Breadcrumbs */}
                <S.Breadcrumb>
                    <a href='/'>Home</a>
                    <span>/</span>
                    <a href='#'>My Account</a>
                    <span>/</span>
                    <p>Forgot Password</p>
                </S.Breadcrumb>

                {/* Information section */}
                <S.Information>
                    <p>We will send you an email so you can change your password.</p>
                </S.Information>

                {/* Form container */}
                <S.ContainerForm onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='divLabelInput'>
                            {/* Email input */}
                            <label>
                                Email Address
                                <input
                                    type="email"
                                    placeholder='youremail@email.com'
                                    {...register("email", { required: true })} // Connect input to form state and apply validation rules
                                />
                                {errors.email && <span> {errors.email?.message}</span>} {/* Display validation error message */}
                            </label>
                        </div>
                        {/* Button to submit the form */}
                        <S.DivButton>
                            <button type="submit">Send Email</button>
                        </S.DivButton>
                        {/* Link to navigate back to the login page */}
                        <p>Back to <a href='/login'>Login</a></p>
                    </div>
                </S.ContainerForm>
            </S.ContainerMain>

        </>
    )
}
