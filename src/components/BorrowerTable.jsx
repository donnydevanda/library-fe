import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function BorrowerTable({ borrowers, onEdit, onDelete }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Card Number</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {borrowers.map((b) => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.id_card_number}</td>
            <td>{b.name}</td>
            <td>{b.email}</td>
            <td>
              <Button
                size="sm"
                variant="warning"
                className="me-2"
                onClick={() => onEdit(b)}
              >
                Edit
              </Button>
              <Button size="sm" variant="danger" onClick={() => onDelete(b.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
