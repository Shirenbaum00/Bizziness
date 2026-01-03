import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/businessPage.css";

interface BusinessPageProps { }

interface BusinessCard {
    _id: string;
    title: string;
    subtitle: string;
    description?: string;
    phone: string;
    email?: string;
    web?: string;
    image?: {
        url: string;
        alt?: string;
    };
    address: {
        country: string;
        city: string;
        street: string;
        houseNumber: number;
    };
    bizNumber: number;
}

const BusinessPage: FunctionComponent<BusinessPageProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [card, setCard] = useState<BusinessCard | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        fetch(`https://bcard-ojqa.onrender.com/cards/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load card");
                return res.json();
            })
            .then((data) => setCard(data))
            .catch(() => setError("Business not found"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="center">Loading business…</p>;
    if (error || !card) return <p className="center">{error}</p>;

    const fullAddress = `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`;

    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
        fullAddress
    )}&output=embed`;

    return (
        <section className="business-page">

            <header className="business-hero">
                <img
                    src={card.image?.url || "https://via.placeholder.com/900x300"}
                    alt={card.image?.alt || card.title}
                />

                <div className="business-hero-text">
                    <h1>{card.title}</h1>
                    <h2>{card.subtitle}</h2>
                </div>
            </header>


            <div className="business-content">

                <section className="business-details">
                    <h3>Business Details</h3>

                    {card.description && <p>{card.description}</p>}

                    <ul>
                        <li>
                            <strong>Phone:</strong>{" "}
                            <a href={`tel:${card.phone}`}>{card.phone}</a>
                        </li>

                        {card.email && (
                            <li>
                                <strong>Email:</strong>{" "}
                                <a href={`mailto:${card.email}`}>{card.email}</a>
                            </li>
                        )}

                        {card.web && (
                            <li>
                                <strong>Website:</strong>{" "}
                                <a href={card.web} target="_blank" rel="noreferrer">
                                    {card.web}
                                </a>
                            </li>
                        )}

                        <li>
                            <strong>Business number:</strong> {card.bizNumber}
                        </li>
                    </ul>
                </section>


                <section className="business-location">
                    <h3>Location</h3>
                    <p>{fullAddress}</p>

                    <div className="map-wrapper">
                        <iframe
                            title="Business location"
                            src={mapSrc}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </section>
            </div>
        </section>
    );
};

export default BusinessPage;
