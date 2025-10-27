import Table from "react-bootstrap/Table";

export default function LoanTable({ loans }) {
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
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr key={loan.id}>
            <td>{loan.id}</td>
            <td>{loan.borrower.name}</td>
            <td>{loan.book.title}</td>
            <td>{loan.borrowed_at}</td>
            <td>{loan.return_deadline}</td>
            <td>{loan.returned_at || "-"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
