import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import { Product } from "models/ProductModel";

type params = {
    producto: Product
};

const CardProduct = ( { producto }: params ) => {

    return (

        <Link to={`/product/${producto.id}`} className="self-start inline-flex items-center gap-2 mb-5">
            <Card title={producto.name} subTitle={`$${producto.price}`} className="mx-3 my-2 h-72 w-72" >
                <img src={producto.image} alt={producto.name} style={{ width: '100px' }} />
                <div>
                    <div className="text-700">{producto.description}</div>
                    <Rating value={producto.rating} readOnly cancel={false} />
                    {/* <Button label="Add to Cart" icon="pi pi-shopping-cart" /> */}
                </div>
            </Card>
        </Link>

    );
}

export default CardProduct