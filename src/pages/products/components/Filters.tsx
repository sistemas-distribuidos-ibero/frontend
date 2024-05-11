import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import { useState } from 'react';

const Filters = () => {
    const [rating, setRating] = useState(0);
    const [minimumPrice, setMinimumPrice] = useState(0);
    const [maximumPrice, setMaximumPrice] = useState(0);
    const [category, setCategory] = useState("");


    return (
        <div className='flex flex-col gap-5 mt-5'>

            <div>
                <h3>Rating</h3>
                <Rating value={rating} onChange={(e) => setRating(e.value? e.value : 0)}/>
            </div>

            <div>
                <h3>Price</h3>
                <div className='flex flex-row gap-1'>
                    <InputText placeholder="Minimum" className='w-1/4 border-2' value={minimumPrice.toString()} onChange={(e) => setMinimumPrice(parseInt(e.target.value))} />
                    <p> --- </p>
                    <InputText placeholder="Maximum" className='w-1/4 border-2' value={maximumPrice.toString()} onChange={(e) => setMaximumPrice(parseInt(e.target.value))} />
                </div>
            </div>

            <div>
                <h3>Category</h3>
                <InputText placeholder="Category" className='w-1/2 border-2' value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>

        </div>
    );
}

export default Filters