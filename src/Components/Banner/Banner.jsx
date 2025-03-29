import React, { useEffect, useState } from 'react'
import { API_Key, imageUrl } from '../../Constants/Constants';
import './Banner.css'
import axios from '../../Axios'

function Banner() {

    const [movie, setMovie] = useState()
    console.log(movie);

    useEffect(() => {

        axios.get(`trending/all/week?api_key=${API_Key}&language=en-US`).then((response) => {


            setMovie(response.data.results.sort((a, b) => {
                { return 0.5 - Math.random() }
            })[0]);
        })
    }, [])

    return (
        <div className='banner'
            style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})` }}>

            <div className="content">

                <h1 className='movie_title'>{movie?.name || movie?.original_title}</h1>

                <div className="banner_buttons">
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>

                <p className='movie_discription'>{movie ? movie.overview : ''}</p>

            </div>

            <div className="fade_bottom"></div>
        </div>
    )
}

export default Banner
