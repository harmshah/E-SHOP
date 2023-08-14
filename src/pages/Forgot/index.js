import React from 'react';
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import * as S from "./styles";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
    })
    .required();

export default function Forgot() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(userData) {
        console.log(userData);
    }

    return (
        <>

            <S.ContainerMain>
                <S.Breadcrumb>
                    <a href='/'>Home</a>
                    <span>/</span>
                    <a href='#'>My Account</a>
                    <span>/</span>
                    <p>Forgot Password</p>
                </S.Breadcrumb>

                <S.Information>
                    <p>We will send you an email so you can change your password.</p>
                </S.Information>

                <S.ContainerForm onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className='divLabelInput'>
                            <label>
                                Email Address
                                <input
                                    type="email"
                                    placeholder='youremail@email.com'
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span> {errors.email?.message}</span>}
                            </label>
                        </div>
                        <S.DivButton>
                            <button type="submit">Send Email</button>
                        </S.DivButton>
                        <p>Back to <a href='/login'>Login</a></p>
                    </div>
                </S.ContainerForm>
            </S.ContainerMain>

        </>
    )
}
