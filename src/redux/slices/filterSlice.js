import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    sort: { name: 'популярности', sortProperty: 'rating' },
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType } = filterSlice.actions;
export const selectCategory = (state) => state.filter.categoryId;
export const selectSort = (state) => state.filter.sort;
export default filterSlice.reducer;
