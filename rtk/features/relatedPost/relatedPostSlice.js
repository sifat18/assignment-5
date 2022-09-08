const {createSlice,createAsyncThunk}=require('@reduxjs/toolkit')
const fetch = require("node-fetch");
// initial state
const initialState={
    loading: false,
    relatedPost:[],
    error: "",

}
// create async thunk
const fetchRelatedPost = createAsyncThunk("relatedPost/fetchPost", async (title) => {
// splitting the text 
    const words=title.split(" ");
let url= 'https://jsonplaceholder.typicode.com/posts?'
// updating url concating the word from split
for (let i of words){
    url+=`title_like=${i}&`
}
// console.log(url)
const response = await fetch(url);
 const post = await response.json();

 return post;

   
});

const relatedPostSlice=createSlice({
    name:'relatedPost',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchRelatedPost.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.relatedPost=(action.payload);
        });  builder.addCase(fetchRelatedPost.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });
        builder.addCase(fetchRelatedPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.relatedPost = [];
        });
    },
})

module.exports=relatedPostSlice.reducer;
module.exports.relatedPostActions=relatedPostSlice.actions;
module.exports.fetchRelatedPost = fetchRelatedPost;
