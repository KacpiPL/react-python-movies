function ActorsList({ actors }) {
    return (
        <div>
            <h3>Actors List</h3>
            <ul>
                {actors.map((actor) => (
                    <li key={actor.id}>{actor.name} {actor.surname}</li>
                ))}
            </ul>
        </div>
    );
}

export default ActorsList;
