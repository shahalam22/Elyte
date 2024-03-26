"use client";

import React, { useEffect, useState } from 'react';
import { fetchDatafromSstrapi } from '@/utils/api';
import ProductCard from '@/components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { setBrandFilter, setBrands, setCategories, setCategoryFilter, setProducts, setAvailabilityFilter } from '@/lib/features/filterReducer';


export default function Products() {

  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();
  const  { filteredData, categories, brands }  = useSelector((state) => state.filter);

  console.log(filteredData);

  useEffect(() => {
      const fetchAsyncData = async () => {
          try {
              const fetchedProducts = await fetchDatafromSstrapi('products');
              dispatch(setProducts(fetchedProducts.data));
              console.log(fetchedProducts.data)
          } catch (error) {
              console.error("Error fetching product", error);
          }
          
          try {
              const fetchedCategories = await fetchDatafromSstrapi('categories');
              dispatch(setCategories(fetchedCategories.data));
              // console.log(fetchedCategories.data);
          } catch (error) {
              console.error("Error fetching categories", error);
          }

          try {
              const fetchedBrands = await fetchDatafromSstrapi('brands');
              dispatch(setBrands(fetchedBrands.data));
              // console.log(fetchedBrands.data);
          } catch (error) {
              console.error("Error fetching brands", error);
          }
      };

      fetchAsyncData();
  }, []);

  const handleCategoryFilter = (e) => {
    const category = e.target.value;
    dispatch(setCategoryFilter(category));
  }

  const handleBrandFilter = (e) => {
    const brand = e.target.value;
    dispatch(setBrandFilter(brand));
  }

  const handleAvailabilityFilter = (e) => {
    const availability = e.target.value;
    dispatch(setAvailabilityFilter(availability));
  }

  const handleResetFilter = () => {
    dispatch(setCategoryFilter('all'));
    dispatch(setBrandFilter('all'));
    dispatch(setAvailabilityFilter('all'));
  }

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  }

  return (
    <div className="md:flex px-10">
        <div className="flex justify-center pt-10">
          <h1 className="text-3xl mb-6">Products</h1>
        </div>
        <div className="md:flex md:flex-col md:w-1/4 sm:w-full py-24">
          <div className="w-full md:hidden">
            <button onClick={handleShowFilter} className="text-white bg-black py-2 px-6 hover:bg-white hover:text-black border hover:border-gray-800 rounded text-lg">Show Filter</button>
          </div>
          <div className={`${showFilter ? '' : 'hidden'} md:block mt-10`}>
            <h1 className="text-2xl mb-6">Filter section</h1>
            <p>Category</p>
            <select onChange={handleCategoryFilter} className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <option value="all">All</option>
              {
                categories && (
                  categories.map((category) => (
                    <option key={category.id} value={category.attributes.slug}>{category.attributes.title}</option>
                  ))
                )
              }
            </select>
            <br/>
            <p>Brand</p>
            <select onChange={handleBrandFilter} className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <option value="all">All</option>
              {
                brands && (
                  brands.map((brand) => (
                    <option key={brand.id} value={brand.attributes.slug}>{brand.attributes.title}</option>
                  ))
                )
              }
            </select>
            <br/>
            <p>Availability</p>
            <select onChange={handleAvailabilityFilter} className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <option value="all">All</option>
              <option value="in stock">In Stock</option>
              <option value="stock out">stock out</option>
            </select>
            <br/>
            <button onClick={handleResetFilter} className="text-white bg-black py-2 px-6 hover:bg-white hover:text-black border hover:border-gray-800 rounded text-lg mt-10">Reset Filter</button>
          </div>
        </div>

        <section className="text-gray-600 body-font md:w-3/4 sm:w-full">
          <div className="container px-5 py-24 mx-auto">
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {
                filteredData && (
                  filteredData.map((product) => (
                    <ProductCard 
                      key={product.id}
                      data={product}
                      // id={product.id}
                      // category={product.attributes.category.data.attributes.title}
                      // title={product.attributes.title}
                      // price={product.attributes.price}
                      // imageUrl={product.attributes.image.data[0].attributes.url}
                    />
                  ))
                )
              }
              {
                filteredData.length === 0 && <h1>No product found</h1>
              }
            </div>
          </div>
        </section>
    </div>
  )
}