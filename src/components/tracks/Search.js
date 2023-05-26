import React, {Component} from 'react'
import axios from 'axios'
import {Consumer} from '../../context'

class Search extends Component {

    state = {
        track_title: ''
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    findTrack = (dispatch, e) => {
        e.preventDefault()
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${this.state.track_title}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_TRACKS',
                    payload: res.data.message.body.track_list
                })
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value
                    return (
                        <div className="card card-body mb-4 p-4">
                            <h1 className="display-4 text-center">
                                <i className="fas fa-music"></i> Search For A Song
                            </h1>
                            <p className="lead text-center">Get The Lyrics For Your Song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder='Song title...'
                                        name='track_title'
                                        value={this.state.track_title}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button className="btn btn-primary btn-lg w-100 mt-4" type='submit'>Find Lyrics</button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search