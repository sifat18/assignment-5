const store = require("./app/store");
const { fetchPost } = require("./features/post/postSlice");
const { fetchRelatedPost } = require("./features/relatedPost/relatedPostSlice");
// initial state
console.log(`Initial State: ${JSON.stringify(store.getState())}`);
let title=''
// subscribe to state changes
store.subscribe(async() => {
    console.log(store.getState());
    const state= store.getState()
    title=await state.post?.posts?.title
});

// disptach actions
store.dispatch(fetchPost());
store.dispatch(fetchRelatedPost(title));
