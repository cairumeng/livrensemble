import { GiChiliPepper } from 'react-icons/gi'
import { FaCartPlus } from 'react-icons/fa'
import useCart from '../../../context/useCart'

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
    return (
      <div className="text-yellow-500 text-lg font-bold my-1"> {price}€ </div>
    )
  }
  const reducedPrice = (price * (1 - promo)).toFixed(2)

  return (
    <div className="flex">
      <div className="text-gray-500 text-lg  my-1 line-through italic">
        {price}€
      </div>
      <div className="text-yellow-500 font-bold text-lg my-1 ml-3">
        {reducedPrice}€
      </div>
    </div>
  )
}

const CategoryDishes = ({ category }) => {
  const { addToCart } = useCart()

  return (
    <>
      <div className="flex justify-between">
        <div className="text-xl pt-4 pl-4 text-black font-bold">
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
              className="w-40 h-40 rounded-md flex-shrink-0"
            />
            <div className="ml-5 flex flex-col justify-between flex-grow">
              <div>
                <div className="font-bold mt-3 text-xl mb-1 capitalize">
                  {dish.name}
                </div>
                <SpicyLevel level={dish.spicy_level} />

                <div className="text-sm my-1">{dish.description}</div>
                <div className="text-sm italic">{dish.ingredients}</div>
              </div>

              <PriceTag price={dish.price} promo={dish.promo} />
            </div>
            <FaCartPlus
              className="mt-4 mr-4 flex-shrink-0 text-blue-500 cursor-pointer text-lg"
              onClick={() => addToCart(dish)}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default CategoryDishes
