import { FunctionComponent } from "react";
import "../styles/footer.css";
interface FooterProps { }

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <footer className="footer">
            <p className="footer-text">
                © {new Date().getFullYear()} Buzziness. All rights reserved.
            </p>

            <div className="footer-icons">
                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <i className="fa-brands fa-github"></i>
                </a>

                <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                >
                    <i className="fa-brands fa-linkedin"></i>
                </a>

                <a
                    href="mailto:contact@buzziness.com"
                    aria-label="Email"
                >
                    <i className="fa-solid fa-envelope"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;

