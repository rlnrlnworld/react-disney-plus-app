import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'

const DetailPage = () => {
  let { movieId } = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`
      )
      setMovie(res.data)
    }
    fetchData()
  }, [movieId])

  if (!movie) return null

  return (
    <section>
      <img 
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='modal__poster-img'
      />
    </section>
  )
}

export default DetailPage
