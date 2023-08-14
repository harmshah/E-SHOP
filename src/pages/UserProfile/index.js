import React, { useState, useEffect } from "react";
import { auth, database } from "../../services/firebase";
import { ref, onValue } from 'firebase/database';
import { Table } from 'react-bootstrap';
import * as S from "./styles";

export default function UserProfile() {
    const [tableData, setTableData] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const dbRef = ref(database, "userlist");

        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach((childSnapshot) => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ key: keyName, data: data });
            });
            setTableData(records);
        });

        // Get the user's email from the authenticated user
        const currentUserEmail = auth.currentUser?.email;
        setUserEmail(currentUserEmail);
    }, []);

    useEffect(() => {
        // Filter the tableData to get only the record with matching email
        const userRecord = tableData.find((row) => row.data.email === userEmail);
        setUserData(userRecord ? userRecord.data : {});
    }, [tableData, userEmail]);

    return (
        <div className="container my-5">
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>User's Profile</p>
            </S.Breadcrumb>

            <div className="card text-center h-100">
                <div className="form my-3">
                    <label htmlFor="firstName" style={{ marginRight: '10px' }}>FirstName: </label>
                    {userData.firstname}
                </div>
                <div className="form my-3">
                    <label htmlFor="lastName" style={{ marginRight: '10px' }}>LastName: </label>
                    {userData.lastname}
                </div>
                <div className="form my-3">
                    <label htmlFor="email" style={{ marginRight: '10px' }}>Email: </label>
                    {userEmail}
                </div>
                <div className="form my-3">
                    <label htmlFor="password" style={{ marginRight: '10px' }}>Password: </label>
                    {userData.pass}
                </div>
            </div>
        </div>
    );
}
