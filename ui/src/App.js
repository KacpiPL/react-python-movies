import './App.css';
import {useState, useEffect} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorsList from "./ActorsList";
import AddActorForm from "./AddActorForm";
import AssignActorForm from "./AssignActorForm";

function App() {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [assigningActor, setAssigningActor] = useState(false);
    const [addingActor, setAddingActor] = useState(false);

    // moved fetchMovies to a separate function
    const fetchMovies = async () => {
        const response = await fetch(`/movies`);
        if (response.ok) {
            const movies = await response.json();
            setMovies(movies);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchActors = async () => {
            const response = await fetch(`/actors`);
            if (response.ok) {
                const actors = await response.json();
                setActors(actors);
            }
        };
        fetchActors();
      }, []);

    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          const newMovie = await response.json();
          setMovies([...movies, newMovie]);
          setAddingMovie(false);
        }
      }
    
    async function handleDeleteMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextMovies = movies.filter(m => m !== movie);
            setMovies(nextMovies);
        }
    }

    async function handleAddActor(actor) {
        const response = await fetch('/actors', {
            method: 'POST',
            body: JSON.stringify(actor),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const newActor = await response.json();
            setActors([...actors, newActor]);
        }
    }

    async function handleAssignActorToMovie(movieId, actorId) {
        const response = await fetch(`/movies/${movieId}/actors`, {
            method: 'POST',
            body: JSON.stringify({ actor_id: actorId }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            alert("Actor added to movie!");
            setAssigningActor(false);
            fetchMovies();
        }
    }

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={(movie) => handleDeleteMovie(movie)}
                              onAssignActor={() => setAssigningActor(true)}
                              actors={actors}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
            <h2>Actors</h2>
            <ActorsList actors={actors} />
            {addingActor
                ? <AddActorForm onActorSubmit={handleAddActor} />
                : <button onClick={() => setAddingActor(true)}>Add an Actor</button>}
            <h2>Actors in movies</h2>
            {assigningActor && <AssignActorForm actors={actors} movies={movies} onAssign={handleAssignActorToMovie} />}
            <button onClick={() => setAssigningActor(true)}>Assign an Actor to a Movie</button>
        </div>
    );
}

export default App;
