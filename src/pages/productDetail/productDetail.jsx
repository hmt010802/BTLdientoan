import React , { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import ConvertToStars from '../../service/convertStar';
import './productDetail.css';
import Popup from '../../components/Popup'
import { base_url } from '../../service/base-url';
const findItemIndex = (cart, id) => {
  return cart.findIndex((item) => item.id === id);
}

function ProductDetail() {
  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [addSuccess, setAddSuccess] = useState(false);
  let { id } = useParams();
  const new_price = (product.price * (100 - product.discountPercentage) / 100).toFixed(2)
  
  useEffect(() => {
    if (id) {
      try {
        axios.get(`${base_url}/products/${id}`)
          .then(response => {
            setProduct(response.data);
            setLoading(false);
          })
      }
      catch (error) {
        console.log(error);
      }
    }

  }, [id]);
  const [selectedImage, setSelectedImage] = useState();
  
  
  const handleAddToCart = () => {
    const item = {
      id: product.id, price: product.price, discountPercentage: product.discountPercentage, new_price: ((100 - product.discountPercentage) * product.price) / 100,
      thumbnail: product.thumbnail, title: product.title, quantity: quantity
    };
    const itemIndex = findItemIndex(cartItems, product.id);

    if (itemIndex !== -1) {
      // If the item already exists in the cart, increase its quantity by 1
      const updatedCart = [...cartItems];
      updatedCart[itemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // If the cart does not exist, create a new array and add the new item to it
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
    }

    // Reset the quantity to 1 after adding the item to the cart
    setQuantity(1);
    setAddSuccess(true)
  }

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };
  if (quantity < 0) {

    alert(' Không thể nhập số âm')
    setQuantity(1)
  }
  localStorage.setItem('cart', JSON.stringify(cartItems));
  function handleImageClick(image) {
    setSelectedImage(image);
  }
  return (
    <div>
      <div className="details-container row">
        <div className=" img-details col-12 col-md-6  ">

          {loading ? (
            <div className="loader_detail">
              <BeatLoader
                size={15}
                color={"#123abc"}

              />
            </div>
          ) :
            <ul className="nav nav-tabs nav-justified">
              <li className="img-cover">
              <img src={ `${selectedImage? selectedImage : product.images[0] }` }alt={product.title} className="col-12" />
              </li>

              <li>
                {product.images && product.images.length > 0 && (
                  <ul className="small-img" >
                    {product.images.slice(0, 4).map((image, index) => (
                      <li key={index} >
                        <img src={image} className='item' alt={`Product Image ${index}`}  onClick={() => handleImageClick(image)} />
                      </li>
                    ))}
                  </ul>
                )}
              </li>

            </ul>}
        </div>


        <div className=" details col-12  col-md-6 ">

          <h1 className="red">{product.title}</h1>
          <div className='rating star'>
            {ConvertToStars(Math.round(product.rating))}

          </div>
          <div className='price-details d-flex column'>
            <h4> Price:</h4>
            <h4 className='n-price  '> ${new_price} </h4>
            <p className='o-price'> ${product.price}</p>

          </div>
          <p className='stock'> Remaining: {product.stock} </p>
          <p className='descript' > {product.description}</p>

          <div className='setQuantity ' >
            <span  onClick={() => setQuantity(quantity - 1)}> - </span>

            <input type="text" className='quantity' name="quantity" onChange={handleQuantityChange} value={quantity} />
            <span  onClick={() => setQuantity(quantity + 1)}> + </span>
          </div>
          <div >
            <button onClick={handleAddToCart} class=' cus-btn add-btn'><span class='add'>Add to Cart</span></button>

          </div>


        </div>

      </div>
      <Popup trigger={addSuccess} setTrigger={setAddSuccess}>
        <p><i class="fa check fa-check"></i> Add to cart success</p>
      </Popup>

    </div>
  )
}

export default ProductDetail;