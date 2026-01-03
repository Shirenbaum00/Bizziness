import { useState } from "react";
import "../styles/businessCard.css";
import EditCardModal from "./EditCardModal";
import DeleteCardModal from "./DeleteCardModal";

interface AuthUser {
    isBusiness: boolean;
    isAdmin: boolean;
}

interface BusinessCardProps {
    id: string;
    image: string;
    title: string;
    description: string;
    phone: string;
    address: string;
    cardNumber: string;
    onCall?: () => void;
}

const getAuthUser = (): AuthUser | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
};

const BusinessCard = ({
    id,
    image,
    title,
    description,
    phone,
    address,
    cardNumber,
    onCall,
}: BusinessCardProps) => {
    const authUser = getAuthUser();

    const isBusiness = authUser?.isBusiness;
    const isAdmin = authUser?.isAdmin;

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);


    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    return (
        <>
            <article className="business-card" id={`card-${id}`}>

                <div className="card-image-wrapper">
                    <img
                        src={image}
                        alt={title}
                        className="card-image"
                    />
                </div>


                <div className="card-content">
                    <h3>{title}</h3>
                    <p>{description}</p>

                    <div className="card-info">
                        <div>📞 {phone}</div>


                        <div>
                            📍{" "}
                            <a
                                href={mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {address}
                            </a>
                        </div>

                        <div>💳 {cardNumber}</div>
                    </div>


                    <div className="card-actions">
                        <button onClick={onCall} aria-label="Call">
                            📞
                        </button>

                        {(isBusiness || isAdmin) && (
                            <button
                                onClick={() => setIsEditOpen(true)}
                                aria-label="Edit card"
                            >
                                ✏️
                            </button>
                        )}

                        {isAdmin && (
                            <button
                                onClick={() => setIsDeleteOpen(true)}
                                aria-label="Delete card"
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                </div>
            </article>

            <EditCardModal
                isOpen={isEditOpen}
                cardId={id}
                onClose={() => setIsEditOpen(false)}
            />

            <DeleteCardModal
                isOpen={isDeleteOpen}
                cardId={id}
                onClose={() => setIsDeleteOpen(false)}
            />
        </>
    );
};

export default BusinessCard;
