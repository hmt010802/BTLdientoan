import axios from 'axios';
import React from 'react';

import { base_url } from './base-url';
export const fetchProducts = () => {
    
    return axios.get(`${base_url}/products?limit=100`)
        .then(response => {
            return response.data.products;

        })
        .catch(error => {
            console.error(error);
        });
};

export let products = [];

fetchProducts().then(data => {
    products = data;
});

export default fetchProducts;
