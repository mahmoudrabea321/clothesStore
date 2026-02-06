import { Link } from 'react-router-dom'

const CategoryItem = ({ category }) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg cursor-pointer">
      <Link
        to={`/categories/${category.href}`}
        className="block h-full w-full"   
      >
        <img
          src={category.imgUrl}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">
            {category.name}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default CategoryItem