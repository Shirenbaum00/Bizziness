import { FunctionComponent } from "react";

interface LogoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal: FunctionComponent<LogoutModalProps> = ({
    isOpen,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    minWidth: "300px",
                }}
            >
                <h3>Are you sure you want to logout?</h3>

                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button onClick={onConfirm}>Yes, Logout</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
