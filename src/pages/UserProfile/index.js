import React, { useState, useEffect } from "react";
import { auth, database } from "../../services/firebase";
import { ref, onValue } from 'firebase/database';
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
        <S.Container>
            <div className="container my-5">
                <S.Breadcrumb>
                    <a href='/'>Home</a>
                    <span>/</span>
                    <p>User's Profile</p>
                </S.Breadcrumb>
                <S.SeeProductsCards>
                    <div className="card text-center h-100">
                        <div className="form my-3" style={{ marginBottom: '10px' }}>
                            <label htmlFor="firstName" style={{ marginRight: '10px', fontWeight: "bold"  }}>FirstName: </label>
                            {userData.firstname}
                        </div>
                        <div className="form my-3" style={{ marginBottom: '10px' }}>
                            <label htmlFor="lastName" style={{ marginRight: '10px', fontWeight: "bold"  }}>LastName: </label>
                            {userData.lastname}
                        </div>
                        <div className="form my-3" style={{ marginBottom: '10px' }}>
                            <label htmlFor="email" style={{ marginRight: '10px', fontWeight: "bold" }}>Email: </label>
                            {userEmail}
                        </div>
                        <div className="form my-3" style={{ marginBottom: '10px' }}>
                            <label htmlFor="password" style={{ marginRight: '10px', fontWeight: "bold"  }}>Password: </label>
                            {userData.pass}
                        </div>
                    </div>
                </S.SeeProductsCards>

            </div>
        </S.Container>
    );
}
