import React from 'react'
import CarouselCard from 'react-rainbow-components/components/CarouselCard'
import CarouselImage from 'react-rainbow-components/components/CarouselImage'
import food1 from './carouselImages/food5.jpg'
import food2 from './carouselImages/food6.jpg'
import food3 from './carouselImages/food7.jpg'

const Carousel = () => {
  return (
    <div className="rainbow-p-bottom_xx-large">
      <CarouselCard className="rainbow-m_auto">
        <CarouselImage
          src={food1}
          assistiveText="First card accessible description."
          href="/#/Components/CarouselCard"
        />
        <CarouselImage
          src={food2}
          assistiveText="Second card accessible description."
          href="/#/Components/CarouselCard"
        />
        <CarouselImage
          src={food3}
          assistiveText="Third card accessible description."
          href="/#/Components/CarouselCard"
        />
      </CarouselCard>
    </div>
  )
}

export default Carousel
