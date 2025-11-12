import "./styles/App.css";
import Header from "./components/app/header";
import Footer from "./components/app/footer";
import LoadingSpinner from "./components/ui/loadingSpinner";
import { Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { loading } = useAuth();
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <>
      <Header></Header>
      <main className="flex-1 flex overflow-auto">
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
}
