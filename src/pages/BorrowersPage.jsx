import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axiosClient from "../api/axiosClient";
import BorrowerTable from "../components/BorrowerTable";

export default function BorrowersPage() {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get("/borrowers")
      .then((res) => setBorrowers(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h3>All Borrowers</h3>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && <BorrowerTable borrowers={borrowers} />}
    </>
  );
}
