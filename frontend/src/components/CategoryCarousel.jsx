import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
   "Top management",
    "Middle management",
    "Frontline management"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='body'>       
            <Carousel className="w-full max-w-xl mx-auto my-20">
  <CarouselContent>
    {
      category.map((cat, index) => (
        <CarouselItem className="sm:basis-full md:basis-1/2 lg:basis-1/3 flex justify-center">
          <Button 
            onClick={() => searchJobHandler(cat)} 
            variant="outline" 
            className="rounded-full border-[#edb526] text-[#edb526] hover:bg-[#edb526] hover:text-white"
          >
            {cat}
          </Button>
        </CarouselItem>
      ))
    }
  </CarouselContent>
  <CarouselPrevious style={{ color: '#7f99b5' }} />
  <CarouselNext style={{ color: '#7f99b5' }} />
</Carousel>

            <style jsx>{`
    @media (max-width: 660px) {
        /* Reducing margin between carousel items */
        .carousel-item {
            margin: 0 2px !important; /* Adjust margin for smaller spacing between items */
        }
        
        /* Adjusting button and navigation arrow spacing */
        .button {
            margin: 5px 0; 
            right: 3px; 
        }
        
        /* Adjusting the position of navigation arrows */
        .-right-12 {
            right: 2rem; /* Reduce spacing for the right arrow */
        }
        .-left-12 {
            left: 1rem; /* Reduce spacing for the left arrow */
        }
    }
`}</style>

        </div>
        
    )
}

export default CategoryCarousel
