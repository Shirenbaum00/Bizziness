import "../styles/modal.css";
import { deleteCard } from "../services/cardService";

interface DeleteCardModalProps {
    isOpen: boolean;
    cardId: string;
    onClose: () => void;
}

const DeleteCardModal = ({
    isOpen,
    cardId,
    onClose,
}: DeleteCardModalProps) => {
    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            await deleteCard(cardId);
            onClose();
            window.location.reload();
        } catch {
            alert("Failed to delete card");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal danger">
                <h2>Delete Card</h2>
                <p>
                    Are you sure you want to permanently delete this business card?
                    <br />
                    This action <strong>cannot be undone</strong>.
                </p>

                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button className="danger-btn" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCardModal;
