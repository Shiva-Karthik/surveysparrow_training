import React from "react";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "./redux/auth/action";
import AllRoutes from "./routes/AllRoutes.jsx";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(isAuthenticated());
  }, []);

  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
