import { useEffect, useState } from "react";
import { Button, Spinner, Alert, Form } from "react-bootstrap";
import LoanTable from "../components/LoanTable";
import axiosClient from "../api/axiosClient";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [lateLoans, setLateLoans] = useState([]);
  const [onTimeLoans, setOnTimeLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [formData, setFormData] = useState({
    borrower_id: "",
    book_id: "",
    return_deadline: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allRes, lateRes, onTimeRes, bookRes, borrowerRes] =
          await Promise.all([
            axiosClient.get("/loans"),
            axiosClient.get("/loans/late"),
            axiosClient.get("/loans/ontime"),
            axiosClient.get("/books/active"),
            axiosClient.get("/borrowers/active"),
          ]);
        setLoans(allRes.data);
        setLateLoans(lateRes.data);
        setOnTimeLoans(onTimeRes.data);
        setBooks(bookRes.data);
        setBorrowers(borrowerRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const refreshLoans = async () => {
    try {
      const [allRes, lateRes, onTimeRes] = await Promise.all([
        axiosClient.get("/loans"),
        axiosClient.get("/loans/late"),
        axiosClient.get("/loans/ontime"),
      ]);
      setLoans(allRes.data);
      setLateLoans(lateRes.data);
      setOnTimeLoans(onTimeRes.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchBooksAndBorrowers = async () => {
    try {
      const [bookRes, borrowerRes] = await Promise.all([
        axiosClient.get("/books/active"),
        axiosClient.get("/borrowers/active"),
      ]);
      setBooks(bookRes.data);
      setBorrowers(borrowerRes.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const returnDeadline = new Date(formData.return_deadline);
    const maxDeadline = new Date();
    maxDeadline.setDate(now.getDate() + 30);

    if (returnDeadline < now) {
      alert("Return deadline cannot be earlier than now.");
      return;
    }
    if (returnDeadline > maxDeadline) {
      alert("Return deadline cannot be more than 30 days from now.");
      return;
    }

    try {
      await axiosClient.post("/loans", formData);
      refreshLoans();
      await fetchBooksAndBorrowers();
      setFormData({ borrower_id: "", book_id: "", return_deadline: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this loan?")) return;
    try {
      await axiosClient.delete(`/loans/${id}`);
      refreshLoans();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <>
      <h3 className="mb-3">Loans Management</h3>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Borrower</Form.Label>
          <Form.Select
            name="borrower_id"
            value={formData.borrower_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Borrower</option>
            {borrowers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Book</Form.Label>
          <Form.Select
            name="book_id"
            value={formData.book_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Book</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Return Deadline</Form.Label>
          <Form.Control
            type="datetime-local"
            name="return_deadline"
            value={formData.return_deadline}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Loan
        </Button>
      </Form>

      <h4>All Loans</h4>
      <LoanTable loans={loans} onDelete={handleDelete} />

      <h4 className="mt-4">Late Loans</h4>
      <LoanTable loans={lateLoans} onDelete={handleDelete} />

      <h4 className="mt-4">On-Time Loans</h4>
      <LoanTable loans={onTimeLoans} onDelete={handleDelete} />
    </>
  );
}
