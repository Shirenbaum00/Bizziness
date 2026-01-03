import { FunctionComponent, useEffect, useState } from "react";
import "../styles/myProfile.css";
import User from "../interfaces/User";
import { getMyUser, updateMyProfile } from "../services/userService";

type ProfileFormData = {
    firstName: string;
    middleName?: string;
    lastName: string;
    phone?: string;
    image?: {
        url: string;
        alt?: string;
    };
};

const MyProfile: FunctionComponent = () => {
    const [user, setUser] = useState<User | null>(null);
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState<ProfileFormData>({
        firstName: "",
        lastName: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* -------- FETCH PROFILE -------- */
    useEffect(() => {
        console.log("Fetching /users/me");
        getMyUser()
            .then((res) => {
                console.log("Profile response:", res.data);
                const u: User = res.data;
                setUser(u);
                setFormData({
                    firstName: u.firstName || "",
                    middleName: u.middleName,
                    lastName: u.lastName || "",
                    phone: u.phone,
                    image: u.image,
                });

                console.log("Profile response:", res.data);
            })
            .catch((err) => {
                console.error("Profile error:", err);
                setError("Failed to load profile");
            })
            .finally(() => setLoading(false));
    }, []);


    /* -------- FORM HANDLERS -------- */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const saveChanges = () => {
        if (!user) return;

        updateMyProfile(user._id, formData)
            .then((res) => {
                setUser(res.data);
                setEditMode(false);
            })
            .catch(() => setError("Failed to update profile"));
    };



    const cancelEdit = () => {
        if (!user) return;

        setFormData({
            firstName: user.firstName || "",
            middleName: user.middleName,
            lastName: user.lastName || "",
            phone: user.phone,
            image: user.image,
        });

        setEditMode(false);
    };

    /* -------- UI STATES -------- */
    if (loading) return <p className="profile-state">Loading profile…</p>;
    if (error) return <p className="profile-state error">{error}</p>;
    if (!user) return <p className="profile-state error">User not found</p>;

    /* -------- RENDER -------- */
    return (
        <div className="profile-page">
            <h1>My Profile</h1>

            <div className="profile-card">
                <img
                    className="profile-avatar"
                    src={user.image?.url || "https://i.sstatic.net/34AD2.jpg"}
                    alt={user.image?.alt || "Profile"}
                />

                <div className="profile-fields">
                    <label>
                        First name
                        <input
                            name="firstName"
                            value={formData.firstName}
                            disabled={!editMode}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Middle name
                        <input
                            name="middleName"
                            value={formData.middleName || ""}
                            disabled={!editMode}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Last name
                        <input
                            name="lastName"
                            value={formData.lastName}
                            disabled={!editMode}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Email
                        <input value={user.email} disabled />
                    </label>

                    <label>
                        Phone
                        <input
                            name="phone"
                            value={formData.phone || ""}
                            disabled={!editMode}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="profile-role">
                        {user.isAdmin
                            ? "Admin"
                            : user.isBusiness
                                ? "Business user"
                                : "Regular user"}
                    </div>
                </div>

                <div className="profile-actions">
                    {!editMode ? (
                        <button onClick={() => setEditMode(true)}>
                            Edit profile
                        </button>
                    ) : (
                        <>
                            <button className="save" onClick={saveChanges}>
                                Save
                            </button>
                            <button className="cancel" onClick={cancelEdit}>
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
