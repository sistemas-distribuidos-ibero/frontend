import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageTemplate from "@assets/PageTemplate";
import { useAPI } from '@hooks/useAPI';
import { Carousel } from 'primereact/carousel';
import CardProduct from './components/CardProduct';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useSessionContext } from '@hooks/useSessionContext';


const ProductDetail = () => {
    const { productId } = useParams();
    const { get, post } = useAPI();
    const [product, setProduct] = useState<Product>();
    const [category, setCategory] = useState<Category>();
    const [products, setProducts] = useState<Product[]>([]);

    const [quantity, setQuantity] = useState(1);

    const context = useSessionContext()
    const navigator = useNavigate()


    useEffect(() => {
        const fetchData = async () => {
            const response = await get(`products/${productId}`, '');

            if (response) {
                setProduct(response);
            }

            const responseProducts = await post('search/1', '', JSON.stringify({ id_category: response['id_category'] }));

            if (responseProducts) {
                setProducts(responseProducts['products']);
            }

            const responseCategory = await get(`categories/${response['id_category']}`, '');

            if (responseCategory) {
                setCategory(responseCategory);
            }
        };

        if (productId) {
            fetchData();
        }
    }, [productId]);


    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 4,
            numScroll: 1
        }, {
            breakpoint: '999px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '790px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '570px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const productTemplate = (product: Product) => {
        return (
            <CardProduct producto={product} className='w-[12rem] h-[14rem]' />
        );
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!context.user) {
            navigator(`/login/${productId}`)
        }

        // TODO: Add product to cart
    }

    return (
        <PageTemplate>
            <section className='min-h-[55vh]'>
                <h1 className='text-3xl tracking-wider'>{product?.name}</h1>
                <h2 className='text-xl text-slate-500'>{category?.name}</h2>
                <div className='grid md:grid-cols-3 lg:grid-cols-4 mt-5 pe-5'>
                    <div className='md:col-span-2 lg:col-span-3 pe-5'>
                        <p className='text-justify'>{product?.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates veniam corrupti libero architecto? Vel voluptate, quo quia, expedita corrupti accusantium reiciendis iusto quos quisquam cum, ab odio sint assumenda repellat?</p>

                        <table className='mt-5 w-full' >
                            <caption className='text-start text-xl mb-2'>Extra Information</caption>
                            <thead>
                                <tr>
                                    {category?.fields.map((key) => {
                                        if (key != '_id' && key != 'id_category' && key != 'name' && key != 'description' && key != 'stock' && key != 'price' && key != 'timestamps' && key != 'updated') {
                                            return (
                                                <th key={key} className='p-1 border-b-2 px-4 text-center'>{key}</th>
                                            )
                                        }
                                    })}
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    {category?.fields.map((key) => {
                                        if (key != '_id' && key != 'id_category' && key != 'name' && key != 'description' && key != 'stock' && key != 'price' && key != 'timestamps' && key != 'updated') {
                                            return (
                                                <td key={key} className='text-center py-1'>{product?.[key]}</td>
                                            )
                                        }
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <form className='mt-5 md:mt-0 border-2 border-violet-800 p-1 py-2 rounded-lg h-96 md:my-0 flex flex-col justify-around items-center' onSubmit={onSubmit}>
                        <header>
                            <h3 className='text-2xl mb-2 text-center'>Add to cart</h3>
                            <h4 className='text-center text-lg'>{product?.name}</h4>
                            <h4 className='text-center'>${product?.price}</h4>
                            <h4 className='text-center '>Remaining:  <em className="text-sm bg-slate-200 p-1 pe-2 text-center rounded-md">{product?.stock}</em> units</h4>
                        </header>
                        <fieldset className='mt-5'>
                            <legend className='hidden'>Quantity</legend>
                            <div className='flex justify-center gap-5'>
                                <Button className="border-2 border-red-600 py-1 text-red-600 hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white" type="button" icon="pi pi-minus" onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : null }} />
                                <InputNumber className="border-2 px-2 py-1 rounded " type="number" max={product?.stock} min={1} value={quantity} />
                                {product?.stock &&
                                    <Button className="border-2 border-green-600 py-1 text-green-600 hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white" type="button" icon="pi pi-plus" onClick={() => { quantity < product?.stock ? setQuantity(quantity + 1) : null }} />
                                }
                            </div>
                        </fieldset>
                        <footer>
                            <p className='mt-5 text-center'>Delivery time: <em className="text-sm bg-slate-200 p-1 pe-2 text-center rounded-md">3 days</em></p>
                            <Button className="mt-5 px-2 ms-3 p-1 text-center border-2 border-violet-800 text-violet-800 hover:bg-violet-800 hover:text-white focus:bg-violet-800 focus:text-white" label='Add to cart' icon={<ShoppingCartIcon className='w-7 pe-1' />} />
                        </footer>
                    </form>
                </div>
            </section>

            <hr />

            <Carousel value={products} numVisible={5}
                numScroll={1} className="mt-5"
                itemTemplate={productTemplate}
                autoplayInterval={3000}
                responsiveOptions={responsiveOptions}
            />
        </PageTemplate>
    );
};

export default ProductDetail;
