import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Spinner from "../layout/Spinner";

function Lyrics() {

    const [track, setTrack] = useState({})
    const [lyrics, setLyrics] = useState({})
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
                setTrack({track})
            })
            .catch(e => console.log(e))

    }, [id])

    if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(track).length === 0) {
        return <Spinner/>
    } else {
        return (
            <>

            </>
        )
    }
}

export default Lyrics
