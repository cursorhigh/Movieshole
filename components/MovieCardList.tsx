import React from "react";
import MovieCard from "@/components/MovieCard";

interface MovieCardProps {
  image: string;
  title: string;
  description: string;
  rating: string;
}

interface MovieCardListProps {
  movies: MovieCardProps[];
}

const MovieCardList: React.FC<MovieCardListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          image={movie.image}
          title={movie.title}
          description={movie.description}
          rating={movie.rating}
        />
      ))}
    </div>
  );
};

export default MovieCardList;
