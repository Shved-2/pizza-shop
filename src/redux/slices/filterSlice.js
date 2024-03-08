import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    pageCount: 1,
    sort: { name: 'популярности', sortProperty: 'rating' },
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
      console.log(state.pageCount);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setPageCount } = filterSlice.actions;
export const selectCategory = (state) => state.filter.categoryId;
export const selectSort = (state) => state.filter.sort;
export const selectPageCount = (state) => state.filter.pageCount;
export default filterSlice.reducer;
