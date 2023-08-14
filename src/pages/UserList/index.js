import React, { useState, useEffect } from "react";
import { database } from "../../services/firebase"; // Import the Firebase database
import { ref, onValue } from 'firebase/database'; // Import necessary functions from Firebase
import * as S from "./styles"; // Import styles from "./styles"

export default function UserList() {
  const [tableData, setTableData] = useState([]); // State to store user data

  useEffect(() => {
    const dbRef = ref(database, 'userlist'); // Reference to the 'userlist' node in Firebase database

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ "key": keyName, "data": data }); // Store data with its key in an array
      });
      setTableData(records); // Update state with fetched data
    });
  }, []); // Run the effect only once during component mount

  return (
    <S.Container>
      <div className="container my-5">
        {/* Breadcrumb */}
        <S.Breadcrumb>
          <a href='/'>Home</a>
          <span>/</span>
          <p>User's List</p>
        </S.Breadcrumb>

        <S.SeeProductsCards>
          <div className="row my-4 h-100">
            <div className="col-md-4 col-lg-8 col-sm-8 mx-auto">

              {/* Display user data in a table */}
              <S.Table className="container w-95" borderd striped variant="light">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.data.firstname}</td>
                        <td>{row.data.lastname}</td>
                        <td>{row.data.email}</td>
                        <td>{row.data.pass}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </S.Table>

            </div>
          </div>
        </S.SeeProductsCards>
      </div>
    </S.Container>
  );
}
