// import FlyingButton from 'react-flying-item'

export default function AddToCartButton({ image, basePrice, hasOptions, onAddToCart }) {

    if (!hasOptions) {
        return (
            <div className='flying-button-parent mt-4' onClick={onAddToCart}>
                <button src={image} alt='image' targetTop={'5%'} targetLeft={'95%'}>
                    <div className='w-full flex justify-center'>
                        Add to cart ₹{basePrice}
                    </div>
                </button>
            </div>
        )
    }

    return (
        <button type="button" onClick={onAddToCart}
            className="mt-4 bg-primary rounded-full text-white px-8 py-2">
            <span>Add to cart ₹{basePrice} onwards</span>
        </button>
    )
}