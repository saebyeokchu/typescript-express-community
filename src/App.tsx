import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Container, Chip } from "@mui/material"
import { HygallProvider } from "./context/HygallContext"

import {
  Main,
  Detail,
  NavBar,
  New
} from './pages'

function App(){
  return (
    <HygallProvider>
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </Container>
    </HygallProvider>
  )
}

export default App