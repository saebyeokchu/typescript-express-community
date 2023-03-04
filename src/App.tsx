import { NavBar } from "./pages/NavBar"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { MainList } from "./pages/MainList"
import { Canvas } from "./pages/Canvas"
import { Container, Chip } from "@mui/material"
import { HygallProvider } from "./context/HygallContext"

function App(){
  return (
    <HygallProvider>
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainList />} />
          <Route path="/canvas" element={<Canvas />} />
        </Routes>
      </Container>
    </HygallProvider>
  )
}

export default App