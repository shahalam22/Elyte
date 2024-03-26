import { addToCart, addToWishlist } from "@/lib/features/userReducer";
import { useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


// id={product.id}
// category={product.attributes.category.data.attributes.title}
// title={product.attributes.title}
// price={product.attributes.price}
// imageUrl={product.attributes.image.data[0].attributes.url}
                    


const ProductCard = ({ data }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { wishlist } = useSelector((state) => state.user);

    const handleAddToWishlist = () => {
      const tempdata = { 
        ...data,
        attributes: {
          ...data.attributes,
          quantity: 1,
        }, 
      };
      // tempdata.attributes.quantity = 1;
      dispatch(addToWishlist(tempdata));
    }

    const handleAddToCart = () => {
      const tempdata = { 
        ...data,
        attributes: {
          ...data.attributes,
          quantity: 1,
        }, 
      };
      // tempdata.attributes.quantity = 1;
      dispatch(addToCart(tempdata));
    }

    const handleSingleProductView = () => {
      router.push(`/products/${data.id}`);
      console.log("handleSingleProductView called");
    }

    return (
        <Card className="p-3 w-full rounded overflow-hidden shadow-md hover:shadow-md mx-4">
          <a className="block relative h-48 rounded overflow-hidden">
            <Card.Img variant="top" alt="ecommerce" className="object-cover object-center w-full h-full block" src={`http://localhost:1337${data.attributes.image.data[0].attributes.url}`}/>
          </a>
          <Card.Body className="text-center">
            <div className="mt-4">
              <Card.Title className="text-gray-500 text-xs tracking-widest title-font mb-1">{data.attributes.category.data.attributes.title}</Card.Title>
              <h2 className="text-gray-900 title-font text-lg font-medium">{data.attributes.title.length > 70 ? `${data.attributes.title.slice(0,70)}...` : data.attributes.title}</h2>
              <p className="mt-1">$ {data.attributes.price}</p>
            </div>
            <div className="flex flex-row justify-between pt-4 px-1">
              <Button variant="outline-dark" className="mx-auto" onClick={handleSingleProductView}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </Button>
              <Button variant="outline-dark" className="mx-auto" onClick={handleAddToCart}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </Button>
              <Button variant="outline-dark" className="mx-auto" onClick={addToWishlist}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </Button>
            </div>
          </Card.Body>
        </Card>
    )
}

export default ProductCard;