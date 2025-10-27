import Table from "react-bootstrap/Table";

export default function BookTable({ books }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>ISBN</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.isbn}</td>
            <td>{book.stock}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
