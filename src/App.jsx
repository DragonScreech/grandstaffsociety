import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { getDownloadURL, ref, listAll } from 'firebase/storage'
import { Letters } from "./pages/Letters";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Song } from "./pages/Song";
import { ModalProvider } from "./context/ModalContext";
import { SongContextProvider } from "./context/SongContext";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import Events from "./pages/Events";

function App() {
  const [modal, setModal] = useState(false)
  return (
    <SongContextProvider>
      <ModalProvider value={{ modal, setModal }}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home></Home>}></Route>
              <Route path="song" element={<Song></Song>}></Route>
              <Route path='letters' element={<Letters></Letters>} />
              <Route path='comingsoon' element={<ComingSoon></ComingSoon>} />
              <Route path='events' element={<Events></Events>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </SongContextProvider>
  )
}

export default App;
