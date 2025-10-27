import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import LoanTable from "../components/LoanTable";
import axiosClient from "../api/axiosClient";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [lateLoans, setLateLoans] = useState([]);
  const [onTimeLoans, setOnTimeLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      axiosClient.get("/loans"),
      axiosClient.get("/loans/late"),
      axiosClient.get("/loans/ontime"),
    ])
      .then(([allRes, lateRes, onTimeRes]) => {
        setLoans(allRes.data);
        setLateLoans(lateRes.data);
        setOnTimeLoans(onTimeRes.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <>
      <h3 className="mb-3">On Loans</h3>
      <LoanTable loans={loans} />
      <Row className="mt-4">
        <Col>
          <h4>Late Loans</h4>
          <LoanTable loans={lateLoans} />
        </Col>
        <Col>
          <h4>On-Time Loans</h4>
          <LoanTable loans={onTimeLoans} />
        </Col>
      </Row>
    </>
  );
}
