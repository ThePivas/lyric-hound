import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

const Track = (props) => {

    const[open, setOpen] = useState(false)

    const {track} = props
    return (
        <div className='col-md-6'>
            <div className='card mb-4 shadow-sm'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between'><h5>{track.track_name}</h5>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls={'collapse-content'}
                            aria-expanded={open}
                            className='btn btn-sm btn-dark'
                        >Expand</Button></div>
                    <Collapse in={open}>
                        <div id='collapse-content'>
                            <p className='card-text'>
                                <strong><i className='fas fa-user'></i> Artist</strong>: {track.artist_name}
                                <br/>
                                <strong><i className='fas fa-compact-disc'></i> Album</strong>: {track.album_name}
                            </p>
                            <Link to={`lyrics/track/${track.track_id}`} className='btn btn-dark btn-block'>
                                <i className='fas fa-chevron-right'></i> View Lyrics
                            </Link>
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>
    )
}

export default Track