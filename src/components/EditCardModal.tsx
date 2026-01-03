import { useEffect, useState } from "react";
import "../styles/modal.css";
import { updateCard, getCardById } from "../services/cardService";

interface EditCardModalProps {
    isOpen: boolean;
    cardId: string;
    onClose: () => void;
}

interface EditCardForm {
    title: string;
    description: string;
    phone: string;
    address: string;
    image: string;
}

const EditCardModal = ({ isOpen, cardId, onClose }: EditCardModalProps) => {
    const [formData, setFormData] = useState<EditCardForm>({
        title: "",
        description: "",
        phone: "",
        address: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // load card data
    useEffect(() => {
        if (!isOpen) return;

        getCardById(cardId)
            .then((res) => {
                const card = res.data;
                setFormData({
                    title: card.title,
                    description: card.subtitle,
                    phone: card.phone,
                    address: `${card.address.street} ${card.address.houseNumber}, ${card.address.city}`,
                    image: card.image?.url || "",
                });
            })
            .catch(() => setError("Failed to load card data"));
    }, [isOpen, cardId]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            await updateCard(cardId, formData as any);
            onClose();
            window.location.reload();
        } catch {
            setError("Failed to update card");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Business Card</h2>

                {error && <p className="error">{error}</p>}

                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                />

                <div className="modal-actions">
                    <button onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                    <button onClick={handleSubmit} disabled={loading}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCardModal;
