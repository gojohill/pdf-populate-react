import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ConsumePost from './pages/ConsumePost';
import ConsumeDelete from './pages/ConsumeDelete';
import PDFgetdata from './pages/PDFgetdata'
import PDFgetdataFile from './pages/PDFgetdataFile'
import PDFPopulate from './pages/PDFPopulate'
import DisplayPDF from './pages/DisplayPDF'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
    // main menu and goes to the path to Consume the GET API
    render() {
        return (
            <Router>
                <div>
                    <table className="App-header-menu">
                        <thead>
                            <tr >
                                <td width="30%">
                                    <div style={{ fontSize: '20px' }} >
                                        <h3>Menu</h3>
                                        <ul>
                                            <li>
                                                <Link style={{ color: 'white' }} to="/">API PDFPopulator (POST) - /pdf/getdata with body</Link>
                                            </li>
                                            <li>
                                                <Link style={{ color: 'white' }} to="/getdatafile">API PDFPopulator (GET) - /pdf/getdata/[file ID]</Link>
                                            </li>
                                            <li>
                                                <Link style={{ color: 'white' }} to="/populatepdf">API PDFPopulator (POST) - /pdf/populate/[file ID] - with Body</Link>
                                            </li>
                                            <li>
                                                <Link style={{ color: 'white' }} to="/loadpdf">Load PDF</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                                <td width="70%">
                                    <div style={{ textAlign: 'Center' }}>
                                        <img src={logo} className="App-logo" alt="logo" />
                                        <h2 className="App-title">React App to Consume <br /> PDFPopulator APIs</h2>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <hr />
                    <Route exact
                        path="/"
                        render={() => <div><h2>API PDFPopulator (POST) - /pdf/getdata with Body</h2>
                            <PDFgetdata /></div>}
                    />
                    <Route exact
                        path="/getdatafile"
                        render={() => <div><h2>API PDFPopulator (GET) - /pdf/getdata/[file ID]</h2>
                            <PDFgetdataFile /></div>}
                    />
                    <Route exact
                        path="/populatepdf"
                        render={() => <div><h2>API PDFPopulator (GET) - /pdf/populate/[file ID] - with Body</h2>
                            <PDFPopulate /></div>}
                    />
                    <Route exact
                        path="/loadpdf"
                        render={() => <div><h2>Load PDF</h2>
                            <DisplayPDF/></div>}
                    />
                    <Route exact
                        path="/logo"
                        render={() =>
                            <div>
                                <header className="App-header">
                                    <img src={logo} className="App-logo" alt="logo" />
                                    <h1 className="App-title">React Solution</h1>
                                </header>
                            </div>
                        }
                    />
                </div>
            </Router >
        );
    }
}

//<header className="App-header">
//    <img src={logo} className="App-logo" alt="logo" />
//    <h1 className="App-title">Welcome to React</h1>
//</header>


export default App;
