import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "shopping/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data.products.filter((product) => product.category === "beauty");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  cart: [],
  totalAmount: 0,
  products: [],
  status: "idle",
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.totalAmount -=
          state.cart[itemIndex].price * state.cart[itemIndex].quantity;
        state.cart.splice(itemIndex, 1);
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount -= item.price;
      }
    },
    updateQuantity: (state, action) => {
      const item = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (item) {
        state.totalAmount +=
          (action.payload.quantity - item.quantity) * item.price;
        item.quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, updateQuantity } =
  shoppingSlice.actions;
export default shoppingSlice.reducer;
