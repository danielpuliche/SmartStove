import React from "react";

const Tabla = (props) => {
    return <table border="1" style={{float:"left", marginLeft:"50px", marginTop: "50px"}}>
    <thead>
      <tr>
        <th>Temperatura</th>
        <th>Gas</th>
        <th>Boquilla</th>
      </tr>
    </thead>
    <tbody>
      {props.data.map(row => (
        <tr key={row.created_at}>
          <td>{row.field1}</td>
          <td>{row.field2}</td>
          <td>{row.field3}</td>
        </tr>
      ))}
    </tbody>
  </table>
  }

export default Tabla