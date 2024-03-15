import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
  const { url, category, sortBy, order, search, currentPage } = params;
  const { data } = await axios.get(
    `${url}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'loading',
  },
  reducers: {
    setPizzaJson: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      console.log('идет отправка');
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      console.log('все удачно', state);
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      console.log('была ошибка');
      state.status = 'error';
      state.items = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setPizzaJson } = pizzaSlice.actions;
export const selectPizza = (state) => state.pizza.items;
export const selectStatus = (state) => state.pizza.status;
export default pizzaSlice.reducer;
