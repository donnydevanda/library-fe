import { useEffect, useState } from "react";
import { Button, Spinner, Alert, Container } from "react-bootstrap";
import axiosClient from "../api/axiosClient";
import BookTable from "../components/BookTable";
import BookFormModal from "../components/BookFormModal";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = () => {
    setLoading(true);
    axiosClient
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = () => {
    setSelectedBook(null);
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axiosClient
        .delete(`/books/${id}`)
        .then(() => fetchBooks())
        .catch((err) => alert("Delete failed: " + err.message));
    }
  };

  const handleSave = (formData) => {
    if (selectedBook) {
      axiosClient
        .put(`/books/${selectedBook.id}`, formData)
        .then(() => {
          setShowModal(false);
          fetchBooks();
        })
        .catch((err) => alert("Update failed: " + err.message));
    } else {
      axiosClient
        .post("/books", formData)
        .then(() => {
          setShowModal(false);
          fetchBooks();
        })
        .catch((err) => alert("Create failed: " + err.message));
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>All Books</h3>
        <Button onClick={handleCreate}>Add Book</Button>
      </div>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <BookFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
        book={selectedBook}
      />
    </Container>
  );
}
