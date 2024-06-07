import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

interface MovieCardProps {
  image: string;
  title: string;
  description: string;
  rating: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, description, rating }) => {
  return (
    <Card className="h-38 ml-3 mr-3 mb-2 mt-2 lg:h-56 flex flex-col border-rose-800 shadow-lg  shadow-rose-500/50"> 
      <CardHeader className="inline-block w-full">
        <div className="flex justify-between items-center">
          <CardTitle className="overflow-ellipsis">{title}</CardTitle>
          <Button variant='outline' className="border-rose-800 shadow-lg  shadow-rose-500/50 hover:shadow-cyan-500/40">
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center"> 
          <img src={image} alt={title} className="w-16 mb-2h-auto sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-20 lg:h-auto object-contain mr-4 border-2 border-dashed border-rose-400 rounded-sm" />
          <div className="ml-4"> 
            <CardDescription className="overflow-hidden max-h-16 sm:max-h-16 md:max-h-20 lg:max-h-24 leading-4">{description}</CardDescription>
            <p>Rating: {rating}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
