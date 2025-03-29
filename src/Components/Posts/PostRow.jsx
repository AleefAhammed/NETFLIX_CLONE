import './PostRow.css'

import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { API_Key, imageUrl } from '../../Constants/Constants'
import axios from '../../Axios'

function PostRow(props) {

    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState('')

    useEffect(() => {

        axios.get(props.url).then((response) => {

            // console.log(response.data);
            setMovies(response.data.results)
        }).catch(err => {
            // alert('Network Error')
        })
    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const HandleMovie = (id) => {

        axios.get(`/movie/${id}/videos?api_key=${API_Key}&language=en-US`).then(response => {

            if (response.data.results.length !== 0) {

                console.log(response.data)
                setUrlId(response.data.results[0])
            } else {

                console.log('Traler Not Avialable')
            }
        })
    }

    return (
        <div className='row'>

            <h2 className="genre_name">{props.title}</h2>

            <div className="movie_poster">
                {movies.map((obj, index) =>

                    <div key={index}>
                        <img onClick={() => HandleMovie(obj.id)}
                            className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="" />
                    </div>
                )}


            </div>

            {urlId && <YouTube videoId={urlId.key} opts={opts} />}
        </div>
    )
}

export default PostRow
