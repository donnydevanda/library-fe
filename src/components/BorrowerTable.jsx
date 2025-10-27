import Table from "react-bootstrap/Table";

export default function BorrowerTable({ borrowers }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Card Number</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {borrowers.map((borrower) => (
          <tr key={borrower.id}>
            <td>{borrower.id}</td>
            <td>{borrower.id_card_number}</td>
            <td>{borrower.name}</td>
            <td>{borrower.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
