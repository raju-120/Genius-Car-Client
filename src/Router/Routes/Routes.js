import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from '../../../src/Pages/Home/Home/Home'
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/Signup/SignUp";
import CheckOut from "../../Pages/CheckOut/CheckOut";
import Orders from "../../Pages/Orders/Orders";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <SignUp></SignUp>
        },
        {
          path: '/checkout/:id',
          element: <CheckOut></CheckOut>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
          path: '/orders',
          element: <Orders></Orders>
        }
      ]
    }
  ]);

export default router;