from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from models import ActorMovie

import schemas
import models

app = FastAPI()
app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")


@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")


@app.get("/movies", response_model=List[schemas.Movie])
def get_movies():
    return list(models.Movie.select())


@app.post("/movies", response_model=schemas.Movie)
def add_movie(movie: schemas.MovieBase):
    movie = models.Movie.create(**movie.dict())
    return movie


@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie


@app.delete("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    db_movie.delete_instance()
    return db_movie

@app.post("/actors", response_model=schemas.Actor)
def create_actor(actor: schemas.ActorCreate):
    new_actor = models.Actor.create(**actor.dict())
    return new_actor

@app.get("/actors", response_model=List[schemas.Actor])
def get_actors():
    return list(models.Actor.select())

@app.post("/movies/{movie_id}/actors")
def add_actor_to_movie(movie_id: int, actor_link: schemas.MovieActorLink):
    movie = models.Movie.get_or_none(models.Movie.id == movie_id)
    actor = models.Actor.get_or_none(models.Actor.id == actor_link.actor_id)
    
    if not movie or not actor:
        raise HTTPException(status_code=404, detail="Movie or Actor not found")
    
    movie.actors.add(actor)
    return {"message": "Actor added to movie"}

@app.get("/movies/{movie_id}/actors", response_model=List[schemas.Actor])
def get_movie_actors(movie_id: int):
    movie = models.Movie.get_or_none(models.Movie.id == movie_id)
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return list(movie.actors)

@app.delete("/movies/{movie_id}/actors/{actor_id}")
def remove_actor_from_movie(movie_id: int, actor_id: int):
    # Sprawdzamy, czy relacja aktor-film istnieje
    query = ActorMovie.delete().where(
        (ActorMovie.movie_id == movie_id) & (ActorMovie.actor_id == actor_id)
    )
    
    if query.execute() == 0:
        raise HTTPException(status_code=404, detail="Actor not assigned to this movie")

    return {"message": "Actor removed from movie"}
