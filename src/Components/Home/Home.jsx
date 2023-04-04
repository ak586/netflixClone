import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from 'axios'
import { BsPlayFill } from 'react-icons/bs' 
import {AiOutlinePlus} from 'react-icons/ai'

const apiKey = "e7e468c455f4af4ed4a4aa2e6eb135a8";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = 'top_rated';



const Card = ({ img }) => (
  <img src={img} alt="cover" className='card'/>
)

const Row = ({ title, arr = [{
}] }) => (
  <div className='row'>
    <h2> {title}</h2>
    <div>
      {
        arr.map((item, index) => (
          <Card key={index} img={imgUrl+item.poster_path} />
        ))
     }
    </div>
  </div>
)


const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
  
    const fetchUpcoming = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
      console.log(upcomingMovies);
    };

    const fetchNowPlaying = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=3`);
      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };
    const fetchTopRated = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };





    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();

 
},[])


  return (
    <section>
      <div className="banner" style={{
                    backgroundImage: popularMovies[0]
                        ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
                        : "rgb(16, 16, 16)",
      }}>
        {popularMovies[0] && (<h1>{popularMovies[0].original_title}</h1>)}
        {popularMovies[0] && (<p>{popularMovies[0].overview}</p>)}
        
        <div>
                    <button>My List <AiOutlinePlus /> </button>
                    <button><BsPlayFill/> Play  </button>
        </div>
        
    </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
    
    </section>
  )
}

export default Home