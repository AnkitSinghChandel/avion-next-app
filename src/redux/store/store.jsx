import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../features/counter/counterSlice";
import userReducer from "../reducer/userReducer";
import teamReducer from "../reducer/teamReducer";
import taskReducer from "../reducer/taskReducer";
import productReducer from "../reducer/productReducer";
import emailReducer from "../reducer/emailReducer";
import commonReducer from "../reducer/commonReducer";
import dashBoardReducer from "../reduxToolkit/dashBoardSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    task: taskReducer,
    product: productReducer,
    email: emailReducer,
    dashBoard: dashBoardReducer,
    common: commonReducer,
  },
});
