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
    },
    setFilters: (state, action) => {
      state.pageCount = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      // console.log(state.pageCount);
      // console.log(state.sort);
      // console.log(state.categoryId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setPageCount, setFilters } = filterSlice.actions;
export const selectCategory = (state) => state.filter.categoryId;
export const selectSort = (state) => state.filter.sort;
export const selectPageCount = (state) => state.filter.pageCount;
export default filterSlice.reducer;
