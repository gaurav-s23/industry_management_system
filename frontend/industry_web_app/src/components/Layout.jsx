import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <Sidebar />

      <main style={{ 
        marginLeft: "240px",
        marginTop: "64px",
        padding: "20px",
        width: "100%"
      }}>
        {children}
      </main>
    </div>
  );
}
