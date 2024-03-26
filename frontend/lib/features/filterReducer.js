const { createSlice } = require("@reduxjs/toolkit");

const data = [];

const initialState = { 
    products: data,
    filteredData: data,
    categoryFilter: 'all',
    brandFilter: 'all',
    categories: data,
    brands: data,
    availabilityFilter: 'all',
 };

 const productSlice = createSlice({
    name: 'values',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.filteredData = action.payload;
            // productSlice.caseReducers.setCategoryFilter(state, {payload: 'all'})
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setBrands: (state, action) => {
            state.brands = action.payload;
        },
        setCategoryFilter: (state, action) => {
            const category = action.payload;
            if(category === 'all') {
                if(state.brandFilter === 'all') {
                    state.filteredData = state.products;
                }else {
                    state.filteredData = state.products.filter((product) => product.attributes.brand.data.attributes.slug === state.brandFilter);
                }
                
                state.categoryFilter = category;
            }else {
                if(state.brandFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === category);
                }else {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === category && product.attributes.brand.data.attributes.slug === state.brandFilter);
                }
                state.categoryFilter = category;
            }
        },
        setBrandFilter: (state, action) => {
            const brand = action.payload;
            if(brand === 'all') {
                if(state.categoryFilter === 'all') {
                    state.filteredData = state.products;
                }else {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === state.categoryFilter);
                }
                
                state.brandFilter = brand;
            }else {
                if(state.categoryFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.brand.data.attributes.slug === brand);
                }else {
                    state.filteredData = state.products.filter((product) => product.attributes.brand.data.attributes.slug === brand && product.attributes.category.data.attributes.slug === state.categoryFilter);
                }
                
                state.brandFilter = brand;
            }
        },
        setAvailabilityFilter: (state, action) => {
            const availability = action.payload;
            if(availability === 'all') {
                if(state.categoryFilter === 'all' && state.brandFilter === 'all') {
                    state.filteredData = state.products;
                }else if(state.categoryFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.brand.data.attributes.slug === state.brandFilter);
                }else if(state.brandFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === state.categoryFilter);
                }else {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === state.categoryFilter && product.attributes.brand.data.attributes.slug === state.brandFilter);
                }
                state.availabilityFilter = availability;
            }else if (availability === "in stock") {
                if(state.categoryFilter === 'all' && state.brandFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.status === "in stock");
                }else if(state.categoryFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.brand.data.attributes.slug === state.brandFilter && product.attributes.status === "in stock");
                }else if(state.brandFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === state.categoryFilter && product.attributes.status === "in stock");
                }else {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === state.categoryFilter && product.attributes.brand.data.attributes.slug === state.brandFilter && product.attributes.status === "in stock");
                }
                state.availabilityFilter = availability;
            }else{
                if(state.categoryFilter === 'all' && state.brandFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.status === "stock out");
                }else if(state.categoryFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.brand.data.attributes.slug === state.brandFilter && product.attributes.status === "stock out");
                }else if(state.brandFilter === 'all') {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === state.categoryFilter && product.attributes.status === "stock out");
                }else {
                    state.filteredData = state.products.filter((product) => product.attributes.category.data.attributes.slug === state.categoryFilter && product.attributes.brand.data.attributes.slug === state.brandFilter && product.attributes.status === "stock out");
                }
                state.availabilityFilter = availability;
            }
        },
    },
 });

 export const { setProducts, setCategories, setBrands, setBrandFilter, setCategoryFilter, setAvailabilityFilter } = productSlice.actions;
 export default productSlice.reducer;