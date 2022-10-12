import { Navigate } from "react-router-dom";

function Protector({children, protect}) {
    if (protect) return <Navigate to="/" replace />;
    return children;
}

export default Protector;