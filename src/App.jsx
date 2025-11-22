import { useEffect, useState } from 'react'
import './App.css'
import { Auth } from './components/auth'
import { db, auth, /*storage*/ } from './config/firebase-config'
// import { getFirestore } from 'firebase/firestore';
import {
  getDocs,
  collection, 
  addDoc,
  deleteDoc, 
  updateDoc,
  doc 
} from 'firebase/firestore';

function App() {

  const [movieList, setMovieList] = useState([]);

  // New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState("");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState("");

  // Update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File apload state
  const [fileUpload, setFileUpload] = useState(null);

  
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

  const updateTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: updatedTitle})
      getMovieList();
    } catch (error) {
      console.log(error);
    } 
  }

  const uploadFile = async () => {
    if (!fileUpload) return;

  }

  useEffect(() => {
    const getMovies = async () => {
      await getMovieList();
    }
    getMovies();
    
  }, []);

  const onSubmitMovie = async () => {
    console.log(newMovieTitle);
    try {
      await addDoc(moviesCollectionRef, {
      title: newMovieTitle, 
      releaseDate: newReleaseDate, 
      receivedAnOscar: isNewMovieOscar,
      userId: auth?.currentUser?.uid
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

            <input type="text" placeholder='new title' onChange={(e) =>setUpdatedTitle(e.target.value)}/>
            <button onClick={() => updateTitle(movie.id)}>Update title</button>
          </div>
        ))}
      </div>

        <div>
          <input type="file" onChange={(event) => setFileUpload(event.target.files[0])}/>
          <button onClick={uploadFile}>Upload File</button>
        </div>

    </div>
  )
}

export default App;