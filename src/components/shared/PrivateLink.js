import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

function PrivateLink({allowedRoles, children, ...rest}) {
    const { user} = useAuth();

    return user && user?.user_metadata?.roles.find(role => allowedRoles.includes(role)) ? (
        <Link {...rest}>
            {children}
        </Link>
  ): null;
}

export default PrivateLink