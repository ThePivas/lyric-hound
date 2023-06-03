import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Index from './components'
import Lyrics from './components/tracks/Lyrics'
import {Provider} from './context'

function App() {
    return (
        <Provider>
            <Router>
                <React.Fragment>
                    <Navbar/>
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/lyrics/track/:id" element={<Lyrics/>}/>
                        </Routes>
                    </div>
                </React.Fragment>
            </Router>
        </Provider>
    )
}

export default App;
