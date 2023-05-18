import React from "react";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { signupLoader } from "./components/Signup/Card";
import { loginLoader } from "./components/Login/Card";
import SearchPage from "./components/SearchPage/SearchPage";
import { placesLoader } from "./components/SearchPage/SearchPage";
import PlaceView, { placeLoader } from "./components/PlaceView/PlaceView";
import UploadPost from "./components/UploadPosts/UploadPost";
import Profile from "./components/Profile/Profile";

import { profileLoader } from "./components/Profile/Profile";
import Loading from "./components/Loading";
import Dummy from './components/Dummy'
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import Logout from "./components/Logout/Logout";





const App=()=>{

    const routes=createBrowserRouter([
        {path:'/',element:<Login />,errorElement:<Dummy />,loader:loginLoader},
        {path:'/signup',element:<Signup/>,errorElement:<Dummy />,loader:signupLoader},
        {path:'/home/:userId',element:<SearchPage />,errorElement:<Dummy />,loader:placesLoader},
        {path:'/home/:userId/:placeId',element:<PlaceView />,errorElement:<Dummy />,loader:placeLoader},
        {path:'/addPost/:userId/:placeId',element:<UploadPost />,errorElement:<Dummy />},
        {path:'/profile/:userId',element:<Profile />,errorElement:<Dummy />,loader:profileLoader},
        {path:'/loader',element:<Loading />,errorElement:<Dummy />},
        {path:'/updateProfile/:userId',element:<UpdateProfile />,errorElement:<Dummy />},
        {path:'/logout',element:<Logout />,errorElement:<Dummy />},
        {path:'/error',element:<Dummy />},
    ])

    return(
        <RouterProvider router={routes} />
    )
}

export default App;