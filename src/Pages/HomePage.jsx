import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner/Banner'
import PostRow from '../Components/Posts/PostRow'
import { Action, Comedy, Horror, Orginals, Romance, Trending } from '../urls'
import { useNavigate } from 'react-router-dom'

function HomePage() {

    // const [user, setUser] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {

        if (!localStorage.user) {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <Banner />
            <PostRow url={Orginals} title='Netflix Orginals' />
            <PostRow url={Trending} title='Trending' isSmall />
            <PostRow url={Action} title='Action' isSmall />
            <PostRow url={Comedy} title='Comedy' isSmall />
            <PostRow url={Romance} title='Romance' isSmall />
            <PostRow url={Horror} title='Horror' isSmall />
        </>
    )
}

export default HomePage
