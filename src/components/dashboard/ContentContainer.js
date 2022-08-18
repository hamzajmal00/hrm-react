
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button } from 'bootstrap'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import TableToExcel from "@linways/table-to-excel";
import Badge from 'react-bootstrap/Badge';

export const ContentContainer = () => {
    const [search, setSearch] = useState("");
    const [Compnies, setCompnies] = useState([]);
    const [filterCompnies, setfilterCompnies] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3003/users')
            .then(function (response) {
                // handle success
                setCompnies(response.data);
                setfilterCompnies(response.data);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                
            })
    }, []);


    useEffect(() => {
        const result = Compnies.filter((country) => {
            console.log(country, 'cont')
            return country.company.toLowerCase().match(search.toLowerCase())

        });
        console.log(result, 'res')
        setfilterCompnies(result);
    }, [search]);



        const downloadData=()=>{

            const pdf = new jsPDF();
            pdf.autoTable({html:'#table'})
            pdf.save('records.pdf');
        
          }
        const csvDownloadData=()=>{

            TableToExcel.convert(document.getElementById("table"));
        
          }
          const gutterStyle = {
            '--bs-gutter-y':' 1.53rem'
          }
    return (
        <Fragment>
            <div className='content-container'>
                <div className='row mb-5 content-container-card-row' style={gutterStyle}>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='content-container-card'>
                            <div className='content-container-card-text'>
                                <h3>Total Companies</h3>
                                <h2 className='content-container-card-text-blue'>4</h2>
                            </div>
                            <div className='content-container-card-icon'>
                                <img src='/images/i-c.svg' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='content-container-card'>
                            <div className='content-container-card-text'>
                                <h3>Active Companies</h3>
                                <h2 className='content-container-card-text-green'>3</h2>
                            </div>
                            <div className='content-container-card-icon'>
                                <img src='/images/i-comp.svg' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='content-container-card'>
                            <div className='content-container-card-text'>
                                <h3>Deactive Companies</h3>
                                <h2 className='content-container-card-text-red'>1</h2>
                            </div>
                            <div className='content-container-card-icon'>
                                <img src='/images/i-block.svg' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 col-sm-12'>
                        <div className='content-container-card'>
                            <div className='content-container-card-text'>
                                <h3>Total Employees</h3>
                                <h2 className='content-container-card-text-orange'>7</h2>
                            </div>
                            <div className='content-container-card-icon'>
                                <img src='/images/i-emp.svg' />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='row mb-5'>
                    <div className='col'>
                        <h2 className='content-container-heading'>Recent Registered Companies </h2>
                    </div>
                </div>
                <div className='content-container-selection'>
                    <div className='select'>
                        <select className="form-select content-container-select">
                            <option  disabled="" value="" id="option1">Company</option>
                            <option selected="" id="option1" value="">All</option>
                            <option value="Abdullah Ahsin">Abdullah Ahsin</option>
                            <option value="Nasir">Nasir</option>
                            <option value="company">company</option>
                        </select>
                    </div>
                    <div className='select'>
                        <select className="form-select content-container-select">
                            <option selected="" disabled="" value="" id="option1">Company</option>
                            <option value="">All</option>
                            <option value="Abdullah Ahsin">Abdullah Ahsin</option>
                            <option value="Nasir">Nasir</option>
                            <option value="company">company</option>
                        </select>
                    </div>
                    <div className='select'>
                        <a href='#' className='content-container-buton'>View ALl</a>
                    </div>
                </div>
                <div className='row  content-container-table-container'>
                    <div className='col-lg-12'>
                        <div className='row mb-3 content-container-table-container-header'>
                            <div className='col-lg-3'>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" onClick={csvDownloadData} class="btn btn-secondary ">Excel</button>
                                    <button type="button"  onClick={downloadData} class="btn btn-secondary ">PDF</button>
                                    <button type="button" class="btn btn-secondary ">Print</button>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div class="row">
                                    <label for="staticEmail" class="col-sm-2 col-form-label"></label>
                                    <div class="col-sm-10">
                                        <input placeholder='search record' type="text" onChange={(e) => setSearch(e.target.value)} class="form-control" value={search} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-lg-12'>
           
                        {/*  <DataTable id="table" columns={column} data={filterCompnies} pagination /> */}
                       <div className='table-responsive'>
                        <table className='table table-borderless' id='table'>

                            <thead className='table-light'>
                                <tr >
                                    <th scope='col'>
                                        #No
                                    </th>
                                    <th scope='col'>
                                    Company
                                    </th>
                                    <th scope='col'>
                                    Email
                                    </th>
                                    <th scope='col'>
                                    Status
                                    </th>
                                    <th scope='col'>
                                    Month
                                    </th>
                                    <th scope='col'>
                                    Created On
                                    </th>
                                    <th className='text-center' scope='col'>
                                    Action
                                    </th>
                                </tr>
                            </thead>

                            {filterCompnies.map((company) => (
                                <tbody key={company.id}>
                                    <tr>
                                        <td>{company.id}</td>
                                        <td>{company.company}</td>
                                        <td>{company.email}</td>
                                        <td><span className='action-ba' >{company.status} </span></td>
                                        <td>{company.month}</td>
                                        <td>{company.createdon}</td>
                                        <td align='center'><img src='/images/table-action.svg' /></td>
                     
                                    </tr>
                                </tbody>
                            ))}

                        </table>
                        </div>
                    </div>
                    

                </div>

            </div>
        </Fragment>
    )
}
