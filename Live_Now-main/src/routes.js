import App from "./App";
import Login from "./pages/LoginPage/Login"
// import Signup from "./pages/SignUp Page";
import Signup from "./pages/SignUp Page/Signup";
const routes=[
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <Signup/>,
      },
  ]
export default routes;