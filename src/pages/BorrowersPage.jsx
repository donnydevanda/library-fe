import { useEffect, useState } from "react";
import { Button, Spinner, Alert, Container } from "react-bootstrap";
import axiosClient from "../api/axiosClient";
import BorrowerTable from "../components/BorrowerTable";
import BorrowerFormModal from "../components/BorrowerFormModal";

export default function BorrowersPage() {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const fetchBorrowers = () => {
    setLoading(true);
    axiosClient
      .get("/borrowers")
      .then((res) => setBorrowers(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const handleCreate = () => {
    setSelectedBorrower(null);
    setShowModal(true);
  };

  const handleEdit = (borrower) => {
    setSelectedBorrower(borrower);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this borrower?")) {
      axiosClient
        .delete(`/borrowers/${id}`)
        .then(() => fetchBorrowers())
        .catch((err) => alert("Delete failed: " + err.message));
    }
  };

  const handleSave = (formData) => {
    if (selectedBorrower) {
      // Update
      axiosClient
        .put(`/borrowers/${selectedBorrower.id}`, formData)
        .then(() => {
          setShowModal(false);
          fetchBorrowers();
        })
        .catch((err) => alert("Update failed: " + err.message));
    } else {
      // Create
      axiosClient
        .post("/borrowers", formData)
        .then(() => {
          setShowModal(false);
          fetchBorrowers();
        })
        .catch((err) => alert("Create failed: " + err.message));
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>All Borrowers</h3>
        <Button onClick={handleCreate}>Add Borrower</Button>
      </div>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <BorrowerTable
          borrowers={borrowers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <BorrowerFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        borrower={selectedBorrower}
      />
    </Container>
  );
}
