import React,{useEffect,useState} from 'react';
import './Home.scss';
import axios from "axios"
import {Link} from "react-router-dom"
import { CiPlay1 } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey="6031ecbde7da309fc5f9524b455ca03c";
const url="https://api.themoviedb.org/3";
const imgUrl="https://image.tmdb.org/t/p/original"
const nowPlaying="now_playing"
const popular="popular";
const topRated="top_rated"
const upcoming="upcoming"

const Row = ({ title ,arr=[]}) => {
  return (
    <div className="row">
      <h2>{title}</h2>
     <div >
      {
        arr.map((item,index)=>{
          return <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
        })
      }
     </div>
    </div>
  );
};

const Card = ({ img }) => {
  return (
      <img className="card" src={img} alt="cover" />
  );
};

const Home = () => {
  const [nowPlayingMovies,setNowPlayingMovies]=useState([])
  const [popularMovies,setPopularMovies]=useState([])
  const [topRatedMovies,setTopRatedMovies]=useState([])
  const [upcomingMovies,setUpcomingMovies]=useState([])
  const [genre,setGenre]=useState([])

  useEffect(() => {
    const fetchNowPlayingMovies=async()=>{
      const {data}=await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=2`)
      setNowPlayingMovies(data.results)
    }
    const fetchPopularMovies=async()=>{
      const {data}=await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
      setPopularMovies(data.results)
    }
    const fetchTopRatedMovies=async()=>{
      const {data}=await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
      setTopRatedMovies(data.results)
    }
    const fetchUpcomingMovies=async()=>{
      const {data}=await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
      setUpcomingMovies(data.results)
    }
    const getAllgenre=async()=>{
      const {data:{genres}}=await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres)
    }

    fetchNowPlayingMovies();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
    getAllgenre();
  }, [])
  

  
  return (
    <div className="home">
      <div className="banner" style={{
        backgroundImage:popularMovies[0]?`url(${`${imgUrl}/${popularMovies[0].poster_path}`})`:"none"
      }}>

        {popularMovies[0] && (
          <h1>{popularMovies[0].original_title}</h1>
          )}

        {popularMovies[0] && (
        <p>{popularMovies[0].overview}</p>
          )}

          <div>
            <button id="play"><CiPlay1 class="icon"/> Play</button>
            <button id="plus">My List <AiOutlinePlus class="icon"/></button>
          </div>
          
      </div>
      <Row title={"Now Playing"} arr={nowPlayingMovies} /> 
      <Row title={"Popular"} arr={popularMovies}/> 
      <Row title={"Top Rated"} arr={topRatedMovies} /> 
      <Row title={"Upcoming"} arr={upcomingMovies}/> 
     
      <div className="genreBox">
  {genre.map((item, index) => (
    <Link key={index} to={`/genre/${item.id}`}>
      {item.name}
    </Link>
  ))}
</div>

    </div>
  );
};

export default Home;
