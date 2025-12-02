import { createSlice } from "@reduxjs/toolkit"


    const initialState= [{
        id: 0,
          name : "",
          type : "",
          data : ""
    }]
const UploadSlice = createSlice({
    name : "upload",
    initialState,
    reducers :{
        upload : (state,action)=>{
           /* state.id = action.payload.id;
            state.name = action.payload.name;
            state.type = action.payload.type;
            state.data = action.payload.data;*/
            state = [...state,action.payload]
        },
        download : (state)=>{

        },
        delete : (state)=>{

        }
    }
});
 export const  {upload,download} = UploadSlice.actions;
 export default UploadSlice.reducer
