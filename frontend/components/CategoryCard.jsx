import Image from "next/image";

const CategoryCard = ({title, description, imageUrl}) => {

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mb-5">
            {/* <Image src={`http://localhost:1337${imageUrl}`} width={150} height={150} alt={title}/> */}
            <img src={`http://localhost:1337${imageUrl}`} alt={title} className="w-full h-200"/>
            <div className="px-6 py-4">
                <h1 className="font-bold text-xl mb-2">{title}</h1>
                <p className="text-gray-700 text-base">{description}</p>
                <button className="bg-black w-full my-4 text-white hover:bg-white hover:text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow">View Products</button>
            </div>
        </div>
    )
}

export default CategoryCard;