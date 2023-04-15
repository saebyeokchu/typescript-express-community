import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Container, Chip, Box, Alert } from "@mui/material"
import { HygallProvider } from "./context/HygallContext"

import {
  Main,
  Detail,
  NavBar,
  New,
  Edit
} from './pages'

function App(){
  
  return (
    <HygallProvider> 
      <Container> 
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:contentId" element={<Detail />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit/:contentId" element={<Edit />} />
        </Routes>
      </Container>
    </HygallProvider>
  )
}

export default App