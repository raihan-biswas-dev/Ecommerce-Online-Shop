import React from 'react'
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';
import { Badge } from "react-bootstrap";
function Rating({ rating, numberOfRating }) {
    return (
        <div>
            <div className='rating'>
                {rating >= 1 ? <FaStar /> : rating >= .5 ? <FaStarHalf /> : <FaRegStar />}
                {rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalf /> : <FaRegStar />}
                {rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalf /> : <FaRegStar />}
                {rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalf /> : <FaRegStar />}
                {rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalf /> : <FaRegStar />}
            </div>
            <h6 className='numberOfRating'>
                Rating
                <Badge className='ms-2' bg="dark">{numberOfRating}</Badge>

            </h6>
        </div>
    )
}

export default Rating