import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FileItem {
    id: number;
    name: string;
    type: string;
    data: string;
    date: string;
    counter: number;
}

const initialState: FileItem[] = [{
    id: 0,
    name: "",
    type: "",
    data: "",
    date: "",
    counter: 0
}];

const UploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        upload: (state, action: PayloadAction<FileItem>) => {
           
            state.push(action.payload);
            localStorage.setItem("my_stored_files", JSON.stringify(state.filter(file => file.id !== 0)));
        },
        
        download: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload;
            const existingFile = state.find(file => file.id === id);
            
            if (existingFile) {
                existingFile.counter += 1;
            }
        },
        
        delete: (state, action: PayloadAction<{ id: number }>) => {
            return state.filter(file => file.id !== action.payload.id);
        }
    }
});

export const { upload, download, delete: deleteFile } = UploadSlice.actions;

export default UploadSlice.reducer;