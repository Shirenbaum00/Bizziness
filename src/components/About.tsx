import { FunctionComponent } from "react";
import "../styles/about.css";

interface AboutProps { }

const About: FunctionComponent<AboutProps> = () => {
    return (
        <section className="about-page">
            {/* HERO */}
            <header className="about-hero">
                <h1>About Buzziness</h1>
                <p className="about-hero-sub">
                    A modern way to create, manage, and explore digital business cards.
                </p>
            </header>

            {/* CONTENT */}
            <div className="about-content">
                <article className="about-block">
                    <h2>Why Buzziness?</h2>
                    <p>
                        Buzziness was created to replace scattered business cards, screenshots,
                        and endless message searches with one clean, centralized experience.
                        Everything you need to present and discover professional information
                        lives in a single, accessible space.
                    </p>
                </article>

                <article className="about-block">
                    <h2>Who Is It For?</h2>
                    <p>
                        The platform supports multiple user roles. Business users can create and
                        manage their own cards, while regular users can browse, explore, and
                        connect with professionals and services that matter to them.
                    </p>
                </article>

                <article className="about-block">
                    <h2>Design & Experience</h2>
                    <p>
                        The application is built with a strong focus on usability,
                        accessibility, and responsiveness. It works seamlessly across devices
                        and supports both light and dark modes, ensuring a clear and pleasant
                        experience everywhere.
                    </p>
                </article>

                <article className="about-block">
                    <h2>Built With Purpose</h2>
                    <p>
                        This project was developed as part of a learning process, combining
                        modern frontend technologies with real-world API integration. The focus
                        was placed on clean architecture, maintainable code, and meaningful user
                        interactions rather than visual noise.
                    </p>
                </article>

                <article className="about-block highlight">
                    <h2>Our Goal</h2>
                    <p>
                        Buzziness demonstrates how modern web applications can balance
                        functionality, clarity, and flexibility — delivering real value without
                        unnecessary complexity.
                    </p>
                </article>
            </div>
        </section>
    );
};

export default About;
