import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Index from './components/layout/Index'
import {Provider} from './context'
import './App.css';

function App() {
    return (
        <Provider>
            <Router>
                <React.Fragment>
                    <Navbar/>
                    <div className="container">
                        <Routes>
                            <Route exact path="/" element={<Index/>}/>
                        </Routes>
                    </div>
                </React.Fragment>
            </Router>
        </Provider>
    )
}

export default App;
