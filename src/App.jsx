import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { db } from './config/firebase-config'
// import { getFirestore } from 'firebase/firestore';
import { /*getFirestore,*/ getDocs, collection } from 'firebase/firestore';

function App() {

  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const movieData = await getDocs(moviesCollectionRef);

        const filteredData = movieData.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
        }));


        setMovieList(filteredData);
        
      } catch (error) {
        console.log(`There has been and error getting db: ${error}`);
        
      }
    }
    getMovieList();
  }), [];
 

  return (
    <div className="App">
      <Auth />

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;