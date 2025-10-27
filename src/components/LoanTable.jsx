import axiosClient from "../api/axiosClient";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function LoanTable({ loans, onDelete }) {
  const handleReturn = async (id) => {
    try {
      const response = await axiosClient.put(`/loans/${id}/return`);
      if (response.status !== 200) {
        throw new Error("Failed to return book");
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error returning book");
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Borrower</th>
          <th>Book</th>
          <th>Borrowed At</th>
          <th>Return Deadline</th>
          <th>Returned At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr key={loan.id}>
            <td>{loan.id}</td>
            <td>{loan.borrower?.name}</td>
            <td>{loan.book?.title}</td>
            <td>{loan.borrowed_at}</td>
            <td>{loan.return_deadline}</td>
            <td>{loan.returned_at || "-"}</td>
            <td>
              {!loan.returned_at && (
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleReturn(loan.id)}
                  disabled={!!loan.returned_at}
                  className="me-2"
                >
                  Return
                </Button>
              )}
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(loan.id)}
                className="me-2"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
