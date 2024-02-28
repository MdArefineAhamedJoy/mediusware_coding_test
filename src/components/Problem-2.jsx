import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const Problem2 = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [showOnlyEven, setShowOnlyEven] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://contact.mediusware.com/api/contacts/?page=${currentPage}`);
                const data = await response.json();
                setContacts(data.results);
            } catch (error) {
                console.error("Error => ", error);
            }
        };

        fetchData();
    }, [currentPage]);

    useEffect(() => {
        const filterContacts = () => {
            if (showOnlyEven) {
                setFilteredContacts(contacts.filter((contact) => contact.id % 2 === 0));
            } else {
                setFilteredContacts(contacts);
            }
        };

        filterContacts();
    }, [showOnlyEven, contacts]);

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
        if (type === "All Contact" || type === "US Contact") {
            window.history.pushState(null, "", `/${type.replace(" ", "-").toLowerCase()}`);
        }
    };

    const closeModal = () => {
        setModalOpen(false);

        window.history.pushState(null, "", "/");
    };

    const handleCheckboxChange = () => {
        setShowOnlyEven((prevShowOnlyEven) => !prevShowOnlyEven);
    };

    const openDetailsModal = (contact) => {
        setModalType("Contact Details");
        setContacts([contact]);
        setModalOpen(true);
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <Button className="btn btn-lg btn-outline-primary" variant="outline-primary" size="lg" onClick={() => openModal("All Contact")}>
                        All Contacts
                    </Button>
                    <Button variant="outline-warning" size="lg" onClick={() => openModal("US Contact")}>
                        US Contacts
                    </Button>
                </div>

                <Modal show={modalOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalType}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {filteredContacts.map((contact) => (
                                <li className="mt-2" key={contact.id} onClick={() => openDetailsModal(contact)} style={{ cursor: "pointer" }}>
                                    <span>Phone: {contact.phone}</span>{" "}
                                    <span>Country: {contact?.country?.name || "Country Not Available"}</span>
                                </li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-outline-primary " variant="outline-primary" onClick={() => openModal("All Contact")}>
                            Modal Button A
                        </Button>
                        <Button className="btn btn-outline-warning"
                            variant="outline-warning"
                            onClick={() => openModal("US Contact")}>
                            Modal Button B
                        </Button>
                        <Button className="btn btn-outline-secondary"
                            variant="outline-secondary"
                            onClick={closeModal}>
                            Modal Button C
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="footer">
                    <label>
                        <input type="checkbox" checked={showOnlyEven} onChange={handleCheckboxChange} />
                        Show Only Even Contacts
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Problem2;
