import Header from "./Composition/Header/Header.jsx"
import Footer from "./Composition/Footer/Footer.jsx"
import RootRoutes from "./routes/RootRoutes.jsx"
import "./styles/global/_reset.scss"
import "./styles/global/_base.scss"

function App() {
  return (
    <div className="app-wrapper">
      <Header />
        <main className="content-wrapper">
            <RootRoutes />
        </main>
      <Footer />
    </div>
  )
}

export default App
