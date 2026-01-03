import { FunctionComponent, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllCards } from "../services/cardService";
import BusinessCard from "../interfaces/BusinessCard";
import BusinessCardComponent from "./BizCard";
import "../styles/home.css";

interface HomeProps { }

const Home: FunctionComponent<HomeProps> = () => {
    const [cards, setCards] = useState<BusinessCard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const query = searchParams.get("q")?.toLowerCase() || "";

    useEffect(() => {
        getAllCards()
            .then((res) => {
                setCards(res.data);
            })
            .catch(() => {
                setError("Failed to load business cards.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredCards = cards.filter(
        (card) =>
            card.title.toLowerCase().includes(query) ||
            card.subtitle?.toLowerCase().includes(query) ||
            card.address.city.toLowerCase().includes(query) ||
            card.address.country.toLowerCase().includes(query)
    );

    return (
        <div className="page">

            <h1>All your business cards, in one place</h1>
            <h2>
                Browse real business cards shared by professionals and companies.
            </h2>

            {loading && <p>Loading cards...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <section className="cards-grid">
                    {filteredCards.map((card) => (
                        <div
                            key={card._id}
                            onClick={() => navigate(`/business/${card._id}`)}
                            style={{ cursor: "pointer" }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") navigate(`/business/${card._id}`);
                            }}
                        >
                            <BusinessCardComponent
                                id={card._id}
                                image={
                                    card.image?.url
                                        ? card.image.url
                                        : "https://via.placeholder.com/400x200"
                                }
                                title={card.title}
                                description={card.subtitle}
                                phone={card.phone}
                                address={`${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`}
                                cardNumber={card.bizNumber.toString()}
                                onCall={() => {
                                    window.open(`tel:${card.phone}`);
                                }}
                            />
                        </div>
                    ))}

                    {filteredCards.length === 0 && (
                        <p style={{ opacity: 0.7 }}>
                            No business cards match your search.
                        </p>
                    )}
                </section>
            )}
        </div>
    );
};

export default Home;
