import {url, setHeaders} from '../../store/api';
import axios from 'axios';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const res = await fetch(`${url}/products`);
  const final = await res.json();
  return final;
});

export const productsCreate = createAsyncThunk(
  'products/productsCreate',
  async (values) => {
    try {
      const res = await axios.post(
        `${url}/products/create`,
        values,
        setHeaders(),
      );
      const final = await res.json();
      return final;
    } catch (error) {
      console.log(error);
    }
  },
);
export const updatedProduct = createAsyncThunk(
  '/products/updatedProduct',
  async values => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
        values,
        setHeaders(),
      );
      const final = await response.json();
      return final;
    } catch (error) {
      console.log(error);
    }
  },
);

export const productsDelete = createAsyncThunk('productsDelete', async _id => {
  try {
    const response = await axios.delete(`${url}/products/${_id}`, setHeaders());
    const final = await response.json();
    return final;
  } catch (error) {
    console.log(error);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    data: null,
    isLoader: false,
    isError: false,
    status: null,
    createStatus: null,
    deleteStatus: null,
    editStatus: null,
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
    builder.addCase(productsCreate.pending, (state, action) => {
      state.createStatus = 'pending';
    });
    builder.addCase(productsCreate.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.createStatus = 'success';
      // toast.success("Product Created!");
    });
    builder.addCase(productsCreate.rejected, (state, action) => {
      state.createStatus = 'rejected';
    });
  },
});

export default productSlice.reducer;
