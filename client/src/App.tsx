import { BrowserRouter, Route, Routes } from "react-router"

import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Forum from "./components/pages/Forum"
import CreateThread from "./components/pages/CreateThread"
import EditThread from "./components/pages/EditThread"
import ThreadPost from "./components/pages/ThreadPost"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/create-thread" element={<CreateThread />} />
        <Route path="/edit-thread/:thread_id" element={<EditThread />} />
        <Route path="/thread/:thread_id" element={<ThreadPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
