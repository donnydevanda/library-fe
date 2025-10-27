import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import BooksPage from "./pages/BooksPage";
import BorrowersPage from "./pages/BorrowersPage";
import LoansPage from "./pages/LoansPage";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<LoansPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/borrowers" element={<BorrowersPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
