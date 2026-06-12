import React, { useEffect, useState } from 'react'
import Style from './RatingStars.module.css'

const RatingStars = ({courseRate}) => {
    const [isRated, setIsRated] = useState(true);
    const [filledStarsCountWidth, setFilledStarsCountWidth] = useState(15);

    const star = 15;
    const starsGap = 2;
    const calculateStars = (rate) => {
    if(rate.count === 0 ||  !rate.count ){
        setFilledStarsCountWidth(15);
        setIsRated(false);
        return;
    }
    else if(rate.count > 0){
        const decimalStar = (star * rate.avg) + (starsGap *(Math.ceil(rate.avg) - 1));
        setFilledStarsCountWidth(decimalStar);
        setIsRated(true);
    }
    }
    useEffect(() => {
    calculateStars(courseRate);
    }, [courseRate]);

    return (
        <div className={Style.courseRating} style={{ width: `${filledStarsCountWidth}px` }}>
            {isRated ? <div className={Style.ratedProduct}>
            {Array.from({ length: 5 }).map((_, index) => (<img key={index}  src="/images/star.png" alt="Stars" className={Style.ratedStars}/> ))}</div>
            : <div className={Style.nonRatedProduct}><img src="/images/nonRatedStar.png" alt="Non Rated Star" className={Style.nonRatedStar} /></div>}
    </div>
    )
}

export default RatingStars