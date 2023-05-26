import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import Moment from 'react-moment'

function Lyrics() {

    const [track, setTrack] = useState({})
    const [lyrics, setLyrics] = useState({})
    const [album, setAlbum] = useState({})
    const {id} = useParams()

    useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                let lyrics = res.data.message.body.lyrics
                setLyrics({lyrics})
                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
            .then(res => {
                let track = res.data.message.body.track
                console.log(res.data.message.body.track.album_id)
                setTrack({track})
                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.get?album_id=${res.data.message.body.track.album_id}}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
            .then(res => {
                console.log(res)
            })
            .catch(e => console.log(e))

    }, [id])

    if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(track).length === 0) {
        return <Spinner/>
    } else {
        return (
            <>
                <Link to='/' className='btn btn-dark btn-sm mb-4'>
                    Go Back
                </Link>
                <div className="card">
                    <h5 className="card-header">
                        {track.track.track_name} by{' '}
                        <span className="text-secondary">{track.track.artist_name}</span>
                    </h5>
                    <div className="card-body">
                        <p className="card-text">
                            {lyrics.lyrics.lyrics_body}
                        </p>
                    </div>
                </div>

                <ul className="list-group mt-3">
                    <li className="list-group-item">
                        <strong>Album</strong>:{' '}
                        {track.track.album_name}
                    </li>
                    <li className="list-group-item">
                        <strong>Song Genre</strong>:{' '}
                        {track.track.primary_genres.music_genre_list.length === 0 ? 'NO GENRE AVAILABLE' : track.track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                    </li>
                    <li className="list-group-item">
                        <strong>Explicit Words</strong>:{' '}
                        {track.track.explicit === 0 ? 'No' : 'Yes'}
                    </li>
                    <li className="list-group-item">
                        <strong>Release Date</strong>:{' '}
                        {track.track.first_release_date}
                    </li>
                </ul>
            </>
        )
    }
}

export default Lyrics
