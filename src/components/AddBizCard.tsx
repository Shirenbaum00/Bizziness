import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/addBizCard.css";
import { createCard } from "../services/cardService";

const AddBizCard: FunctionComponent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        imageUrl: "",
        imageAlt: "",
        street: "",
        houseNumber: "",
        city: "",
        country: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const payload = {
            title: formData.title,
            subtitle: formData.subtitle,
            description: formData.description,
            phone: formData.phone,
            email: formData.email,
            web: formData.web,
            image: {
                url: formData.imageUrl,
                alt: formData.imageAlt,
            },
            address: {
                street: formData.street,
                houseNumber: Number(formData.houseNumber),
                city: formData.city,
                country: formData.country,
            },
        };

        createCard(payload)
            .then(() => {
                setSuccess(true);
                setTimeout(() => navigate("/"), 1200);
            })
            .catch(() => {
                setError("Failed to create business card");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="page">
            <h1>Add Business Card</h1>
            <h2>Create a new card for your business</h2>

            <form className="add-biz-form" onSubmit={handleSubmit}>
                <input name="title" placeholder="Title" onChange={handleChange} required />
                <input name="subtitle" placeholder="Subtitle" onChange={handleChange} />
                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />

                <input name="phone" placeholder="Phone" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="web" placeholder="Website" onChange={handleChange} />

                <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
                <input name="imageAlt" placeholder="Image alt text" onChange={handleChange} />

                <input name="street" placeholder="Street" onChange={handleChange} required />
                <input
                    name="houseNumber"
                    placeholder="House number"
                    type="number"
                    onChange={handleChange}
                    required
                />
                <input name="city" placeholder="City" onChange={handleChange} required />
                <input name="country" placeholder="Country" onChange={handleChange} required />

                {error && <p className="error">{error}</p>}
                {success && <p className="success">Business card created 🎉</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Card"}
                </button>
            </form>
        </div>
    );
};

export default AddBizCard;
