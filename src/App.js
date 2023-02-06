import React from 'react';
import './App.css';
import { Customers } from './Customers'
import { Header } from './Header'
// import { ExportReactCSV } from './ExportReactCSV'
import CustomerData from './data';
import ExcelExportHelper from './ExportCSV';

class App extends React.Component {

  
  customers = () => {
    let custs = []
    CustomerData.forEach(v =>  {
      // console.log(v)
      let key, keys = Object.keys(v);
      let total = keys.length;
      let result = {}

    for (let i = 0; i< total; i++) {
      key = keys[i];
      result[key.toUpperCase()] = v[key];
      // console.log(result);
    }

    custs.push(result);
  });
    
    // console.log("outside", custs);  
    return custs;
  }

  state = {
    customers: this.customers(),
  }
  
  render() {

    return (
      <div className="App">
        <Header />
        <div className="row">
            <div className="col-md-8">
                <h2>Customers</h2>
            </div>
            <div className="col-md-4 center">
                <ExcelExportHelper csvData={this.state.customers} />
            </div>
        </div>
        <Customers customers={this.customers()}/>
      </div>
    );
  }
}

export default App;
