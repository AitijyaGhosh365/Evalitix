import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
// import CandidateView from "./Pages/CandidateView";
import LandingPage from "./Pages/LandingPage";
import FormEdit from "./Pages/Form/FormEdit";
import FormView from "./Pages/Form/FormView";
import FormShare from "./Pages/Form/FormShare";
import FormFill from "./Pages/Form/FormFill";
import TestAuth from "./Pages/TestAuth";
import RequireAuth from "./gaurds/RequireAuth";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import AccountPage from "./Pages/Account";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Candidate default */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin */}
        <Route path="/dashboard" element={
          <RequireAuth>

            <Dashboard />
          </RequireAuth>

        } />

        {/* Form routes */}
        <Route
          path="/form/edit/:uuid"
          element={
            <RequireAuth>
              <FormEdit />
            </RequireAuth>
          }
        />
        <Route
          path="/form/view/:uuid"
          element={
            <RequireAuth>
              <FormView formShare={true}/>
            </RequireAuth>
          }
        />
        <Route path="/form/share/:uuid" element={<FormShare  />} />
        <Route path="/form/fill/:uuid" element={<FormFill />} />

        <Route path="/test-auth" element={<TestAuth />} />

        <Route path="/login" element={<Login />} />

        <Route
  path="/account"
  element={
    <RequireAuth>
      <AccountPage />
    </RequireAuth>
  }
/>


        {/* 404 — MUST BE LAST */}
      <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
