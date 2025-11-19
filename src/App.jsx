import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { db } from './config/firebase-config'
// import { getFirestore } from 'firebase/firestore';
import { /*getFirestore,*/ getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {

  const [movieList, setMovieList] = useState([]);

  // New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState("");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const movieData = await getDocs(moviesCollectionRef)
    

      const filteredData = movieData.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id
      }));


      setMovieList(filteredData);
      
    } catch (error) {
      console.log(`There has been and error getting db: ${error}`);
      
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getMovies = async () => {
      await getMovieList();
    }
    getMovies();
    
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
      title: newMovieTitle, 
      releaseDate: newReleaseDate, 
      receivedAnOscar: isNewMovieOscar
    });

    getMovieList();
    } catch (error) {
      console.log(error);
      
    }
    
  }
 

  return (
    <div className="App">
      <Auth />

      <div>
        <input type="text" placeholder='Movie title...' onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input type="number" placeholder='Release date...' onChange={(e) => setnewReleaseDate(Number(e.target.value))}/>
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)}/>
        <label htmlFor="input">Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;