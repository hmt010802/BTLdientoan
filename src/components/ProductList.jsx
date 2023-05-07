import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './productList.css';
import { Carousel } from 'react-bootstrap';
import ConvertToStars from '../service/convertStar';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { base_url } from '../service/base-url';
import Popup from './Popup';

function ProductList() {
  const [totalCount, setTotalCount] = useState(0)
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const [addSuccess, setAddSuccess] = useState(false);
  const getProducts = async (pg = page, pgSize = 20) => {
    try {

      const res = await axios.get(`${base_url}/products?limit=${100}&page=${pg}`);
      const startIdx = (pg - 1) * pgSize;
      const endIdx = pg * pgSize;
      setProducts(res.data.products.slice(startIdx, endIdx));
      setTotalCount(res.data.total)


    }
    catch (errors) {
      console.log("Call API products errors:", errors);
      setLoading(false)
    }
  };

  useEffect(() => {

    getProducts(page);
    setLoading(false);

  }, [page]);

  const prePage = async () => {
    const pg = page === 1 ? 1 : page - 1;
    setPage(pg);
  };

  const nextPage = async () => {
    const pg = page + 1;
    setPage(pg);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % products.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [index, products]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const findItemIndex = (cart, id) => {
    return cart.findIndex((item) => item.id === id);
  }

  return (
    <div className='aa' >

      <Carousel className='slide' activeIndex={index} onSelect={handleSelect}>
        {products?.map((product, index) => (
          <Carousel.Item key={index}>
            <Link className='text-black' to={`/product/${product.id}`}>
              <img
                className="d-block img-slide"
                src={product.thumbnail}
                alt={product.title}
              />
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className=" container">
        {
          loading ? (
            <div className="loader">
              <BeatLoader
                size={15}
                color={"#123abc"}

              />
            </div>
          ) :
            products?.map((product, index) => (


              <div className='cardViewContainer' key={index}><div className="cardView">

                <img src={product.thumbnail} className="thumbnail" />



                <div className='detail'>
                  <Link className='text-black' to={`/product/${product.id}`}>
                    <h6 className='title'> {product.title}</h6>
                    <p className='des'>{product.description}</p>
                  </Link>
                  <div className='rating star'>
                    {ConvertToStars(Math.round(product.rating))}

                  </div>

                  <div className='price'>
                    <h4 className='new-price'> {(product.price * (100 - product.discountPercentage) / 100).toFixed(2)} </h4>
                    <p className='old-price'>${product.price}</p>
                  </div>
                  <div className='add-cart'>
                    <button onClick={() => {
                      
                      const item = {
                        id: product.id, price: product.price, discountPercentage: product.discountPercentage, new_price: ((100 - product.discountPercentage) * product.price) / 100,
                        thumbnail: product.thumbnail, title: product.title, quantity: 1
                      };


                      const itemIndex = findItemIndex(cartItems, product.id);
console.log("bắt đầu");
                      if (itemIndex !== -1) {
                        // If the item already exists in the cart, increase its quantity by 1
                        console.log("sản phẩm tồn tại")
                        const updatedCart = [...cartItems];
                        updatedCart[itemIndex].quantity += 1;
                        setCartItems(cartItems);
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                      } else {
                        console.log("sản phẩm chưa tồn tại")
                        // If the cart does not exist, create a new array and add the new item to it
                        const updatedCart = [...cartItems, item];
                        
                        setCartItems(updatedCart);
                        localStorage.setItem('cart', JSON.stringify(updatedCart));

                      }
                   

                     



                      setAddSuccess(true)
                    }} class=' cus-btn  add-btn'><span class='add'>Add to Cart</span></button>

                  </div>
                </div>
              </div>

              </div>



            ))}

      </div>
      <div className='page'>
        <button onClick={prePage} disabled={page === 1}>Previous</button>

        {Array.from({ length: Math.min(Math.ceil(totalCount/  pageSize)) }, (v, i) => i + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</button>
        ))}

        <button onClick={nextPage} disabled={totalCount <= page * pageSize}>Next</button>
        <br />
      </div>

      <Popup trigger={addSuccess} setTrigger={setAddSuccess}>
        <p><i class="fa check fa-check"></i> Add to cart success</p>
      </Popup>
    </div>

  )
}

export default ProductList


