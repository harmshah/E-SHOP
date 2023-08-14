import React, { useState, useEffect } from "react";
import { database } from "../../services/firebase";
import { ref, onValue } from 'firebase/database';
import { Table } from 'react-bootstrap';
import * as S from "./styles";

export default function UserList() {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const dbRef = ref(database, 'userlist');

        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ "key": keyName, "data": data });
            });
            setTableData(records);
        });
    }, []);

    return (
        <div className="container my-5">
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>User's List</p>
            </S.Breadcrumb>

            <div className="my-5 text-center">
                <h1>List of Users</h1>
            </div>

            <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-8 col-sm-8 mx-auto">
            
          <Table className="container w-95" borderd striped variant="light">
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
              <td>{index+1}</td>
              <td>{row.data.firstname}</td>
              <td>{row.data.lastname}</td>
              <td>{row.data.email}</td>
              <td>{row.data.pass}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>

          </div>
        </div>

        </div>
    );
}
