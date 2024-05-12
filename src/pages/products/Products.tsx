import { useState, useEffect } from 'react';
import PageTemplate from "@assets/PageTemplate";
import CardProduct from './components/CardProduct';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAPI } from '@hooks/useAPI';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';


const Products = () => {
    const { get, post } = useAPI()
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [page, setPage] = useState(0)
    const [rows, setRows] = useState(1)
    const [maxPages, setMaxPages] = useState(1)

    const [name, setName] = useState("");
    const [minimumPrice, setMinimumPrice] = useState(0);
    const [maximumPrice, setMaximumPrice] = useState(0);
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        const fetchCategories = async () => {
            const responseCategories = await get('categories', '');

            if (responseCategories) {
                setCategories(responseCategories['categories']);
            }
        }

        fetchCategories();

    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (name != "" || minimumPrice != 0 || maximumPrice != 0 || category) {

                const body: Query = {}

                if (name != "") {
                    body['query'] = name
                }
                if (minimumPrice != 0) {
                    body['price_min'] = minimumPrice
                }
                if (maximumPrice != 0) {
                    body['price_max'] = maximumPrice
                }
                if (category) {
                    body['id_category'] = category._id
                }

                const response = await post('search/1', '', JSON.stringify(body))

                if (response) {
                    setProducts(response['products']);

                    setMaxPages(response['total_pages']);
                }
            }
            else {
                const response = await get(`products/${page + 1}`, '');

                if (response) {
                    setProducts(response['products']);

                    setMaxPages(response['total_pages']);
                }
            }
        }

        fetchProducts();

    }, [page, name, minimumPrice, maximumPrice, category]);

    return (
        <PageTemplate>
            <>
                <header className='flex flex-col gap-3'>
                    <fieldset className="p-inputgroup flex justify-center items-center">
                        <InputText placeholder=" Buscar..." className="p-inputtext-lg border-2 h-12 rounded-lg px-2" value={name} onChange={(e) => {
                            setName(e.target.value)
                            setPage(0)
                        }} />
                        <span className="p-inputgroup-addon">
                            <Button icon="pi pi-search" className="p-button-rounded p-button-text border-2" />
                        </span>
                    </fieldset>
                    <div className="md:grid md:grid-cols-2 md:gap-2">
                        <section className='flex flex-row items-center gap-4 my-2 md:my-0 '>
                            <h3 className='text-lg mb-1 font-semibold'>Price</h3>
                            <fieldset className='flex flex-row gap-1 items-center w-full px-2'>
                                <InputText placeholder="Minimum" className='w-1/3 md:w-1/2 xl:w-1/3 border-2 h-10 text-center' value={minimumPrice ? minimumPrice.toString() : ""} onChange={(e) => {
                                    setMinimumPrice(parseInt(e.target.value))
                                    setPage(0)
                                }} />
                                <p> &mdash;&mdash; </p>
                                <InputText placeholder="Maximum" className='w-1/3 md:w-1/2 xl:w-1/3 border-2 h-10 text-center' value={maximumPrice ? maximumPrice.toString() : ""} onChange={(e) => {
                                    setMaximumPrice(parseInt(e.target.value))
                                    setPage(0)
                                }} />
                            </fieldset>
                        </section>

                        <fieldset>
                            <FloatLabel>
                                <Dropdown showClear inputId="dd-category" value={category} onChange={(e) => {
                                    setCategory(e.value)
                                    setPage(0)
                                }}
                                    options={categories} optionLabel="name" className="border-2 w-full" />
                                <label htmlFor="dd-category">Select a Category</label>
                            </FloatLabel>
                        </fieldset>
                    </div>
                </header>

                <div className="flex flex-wrap gap-4 p-5 justify-center min-h-[64vh]">
                    {products.map((producto) =>
                        <CardProduct key={producto._id} producto={producto} />
                    )}
                </div>

                <Paginator
                    first={page} rows={rows}
                    onPageChange={(event) => {
                        setPage(event.first);
                        setRows(event.rows);
                    }}
                    totalRecords={maxPages}
                />
            </>
        </PageTemplate >
    );
};

export default Products;
