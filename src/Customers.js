import React from 'react'
import Table from 'react-bootstrap/Table';

export const Customers = ({customers}) => {

    // console.log(customers.length);

    const CustomerRow = (customer,index) => {
        return(
              <tr key = {index} className='even'>
                  {/* <td> {index + 1} </td> */} 
                  <td>{customer.EMPID}</td>
                  <td>{customer.CITY}</td>
                  <td>{customer.EXP}</td>
              </tr>
          )
      }

      const getTableHeader = () => {
        // console.log("inside...")
        let arrLen = customers.length;
        if(arrLen > 0) {
            let custObj = customers[0];
            // console.log(custObj);
            let keys = Object.keys(custObj)
        return keys;
    }
      }
      const CustomerTable = customers.map((cust,index) => CustomerRow(cust,index));

      const tableHeader = getTableHeader();
      
      
    return (
        <Table striped bordered hover>
             <thead className='bgvi'>
                <tr>
                    {tableHeader.map((key, index)=>{
                        return (
                            <th key={index}>{key}</th>
                        )
                    })}
                </tr>
            </thead> 
            <tbody>
                {CustomerTable}
            </tbody>
        </Table>
    )
}