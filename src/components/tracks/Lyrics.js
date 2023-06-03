import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../layout/spinner/Spinner'

function Lyrics() {

    const [track, setTrack] = useState({})
    const [lyrics, setLyrics] = useState({})
    const [videoId, setVideoId] = useState('')
    const {id} = useParams()

    useEffect(() => {
        axios.get(`https://corsproxy.io/?https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                let lyrics = res.data.message.body.lyrics
                setLyrics({lyrics})
                return axios.get(`https://corsproxy.io/?https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
            .then(res => {
                let track = res.data.message.body.track
                setTrack({track})
                return axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        key: process.env.REACT_APP_YT_KEY,
                        q: `${track.artist_name} - ${track.track_name}`,
                        type: 'video',
                        maxResults: 1
                    }
                })
            })
            .then(res => {
                let videoId = res.data.items[0].id.videoId
                setVideoId(videoId)
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
                </ul>
                <div className="embed-responsive embed-responsive-16by9 mt-3 mb-3 d-flex justify-content-center align-items-center">
                    <iframe title="YouTube video" className="embed-responsive-item " src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                            allowFullScreen></iframe>
                </div>
            </>
        )
    }
}

export default Lyrics
