import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axiosClient from "../api/axiosClient";
import BookTable from "../components/BookTable";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h3>All Books</h3>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && <BookTable books={books} />}
    </>
  );
}
