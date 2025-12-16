import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import StudentScores from "./pages/StudentScores";

function App() {
  return (
    <>
      <Toaster richColors />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route path="/students/:code/scores" element={<StudentScores />} />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
