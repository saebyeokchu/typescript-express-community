import { NavBar } from "./pages/NavBar"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { MainContentList } from "./pages/MainContentList"
import { New } from "./pages/New"
import { Container, Chip } from "@mui/material"
import { HygallProvider } from "./context/HygallContext"
import { DetailContent } from "./pages/DetailContent"

function App(){
  return (
    <HygallProvider>
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainContentList />} />
          <Route path="/new" element={<New />} />
          <Route path="/detail" element={<DetailContent />} />
        </Routes>
      </Container>
    </HygallProvider>
  )
}

export default App