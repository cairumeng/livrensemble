import { GiChiliPepper } from 'react-icons/gi'
import { FaPlus } from 'react-icons/fa'
import useCart from '../../../context/useCart'
import { useParams } from 'react-router-dom'

const SpicyLevel = ({ level }) => {
  const spicyLevel = new Array(level).fill(1)

  return (
    <div className="flex">
      {spicyLevel.map((_, idx) => (
        <GiChiliPepper color="red" key={idx} />
      ))}
    </div>
  )
}

const PriceTag = ({ price, promo }) => {
  if (promo == 0) {
    return <div className="md:text-lg font-bold my-1"> {price}€ </div>
  }
  const reducedPrice = (price * (1 - promo)).toFixed(2)

  return (
    <div className="flex">
      <div className="text-gray-500 md:text-lg my-1 line-through italic">
        {price}€
      </div>
      <div className="font-bold md:text-lg my-1 ml-3">{reducedPrice}€</div>
    </div>
  )
}

const CategoryDishes = ({ category }) => {
  const { addToCart } = useCart()
  const { id } = useParams()

  return (
    <>
      <div className="flex justify-between" id={`category-${category.id}`}>
        <div className="text-base md:text-xl pt-4 pl-4 text-black font-bold">
          {category.name}
        </div>
      </div>

      <div>
        {category.dishes.map((dish) => (
          <div
            className="border rounded-md ml-7 flex justify-between mt-4"
            key={dish.id}
          >
            <img
              alt={dish.name}
              src={dish.avatar}
              className="w-28 h-28 md:w-40 md:h-40 rounded-md flex-shrink-0 my-auto"
            />
            <div className="ml-5 flex flex-col justify-between flex-grow">
              <div>
                <div className="font-bold mt-3 md:text-xl mb-1 capitalize">
                  {dish.name}
                </div>
                <SpicyLevel level={dish.spicy_level} />

                <div className="text-xs md:text-sm my-1">
                  {dish.description}
                </div>
                <div className="text-xs md:text-sm italic">
                  {dish.ingredients}
                </div>
              </div>

              <PriceTag price={dish.price} promo={dish.promo} />
            </div>
            <FaPlus
              className="mt-4 mr-4 flex-shrink-0 text-blue-500 cursor-pointer text-xl"
              onClick={() =>
                addToCart(id, {
                  dish_id: dish.id,
                  name: dish.name,
                  price: dish.price,
                  promo: dish.promo,
                })
              }
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default CategoryDishes
