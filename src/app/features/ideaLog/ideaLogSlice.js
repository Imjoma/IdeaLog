import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const initialState = {
  list: [
    // {
    //   _id: uuidv4(),
    //   image: "",
    //   title: " i added mongo",
    //   description: "soone emplo",
    //   visibility: true,
    //   createdAt: new Date(),
    // },
  ],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

export const fetchIdeas = createAsyncThunk("idea/fetchIdeas", async () => {
  try {
    const response = await axios.get(`/api/ideas`); // Example endpoint
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    addIdea: (state, action) => {
      const newIdea = action.payload;
      state.list.unshift(newIdea);
    },
    updateIdea: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.list.findIndex((idea) => idea._id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedData };
      }
    },
    deleteIdea: (state, action) => {
      state.list = state.list.filter((idea) => idea._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdeas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIdeas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })

      .addCase(fetchIdeas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addIdea, deleteIdea, updateIdea } = ideaSlice.actions;
export default ideaSlice.reducer;

// Optionally export selectors if needed
export const selectAllIdeas = (state) => state.ideas.list;
export const selectIdeasStatus = (state) => state.ideas.status;
export const selectIdeasError = (state) => state.ideas.error;
export const selectIdeasUpdated = (state) => state.ideas.list;
