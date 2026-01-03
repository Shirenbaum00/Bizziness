import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface PageNotFoundProps { }

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <img
                    src="https://www.brn.co.il/wp-content/uploads/2023/03/8030430_3828537.webp"
                    alt="404 page img"
                    className="img404"
                />
            </div>

            <p>404 Page not found</p>

            <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
            >
                Back To Home
            </button>
        </>
    );
};

export default PageNotFound;
