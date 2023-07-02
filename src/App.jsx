import { Container } from 'react-bootstrap';

import FavoritesModal from './Components/FavoritesModal';
import Foother from './Components/Foother';
import Formulario from './Components/Formulario';
import Header from './Components/Header';
import ListadoBebidas from './Components/ListadoBebidas';
import ModalBebida from './Components/ModalBebida';
import { BebidasProvider } from './context/BebidasProvider';
import { CategoriasProvider } from './context/CategoriasProvider';

function App() {

  return (

      <CategoriasProvider>
        <BebidasProvider>

            <Header/>
          <div 
            className='d-flex flex-column justify-content-between'
              
          >

            <Container
              className={'mt-5'}
              >
              <Formulario/>
              <ListadoBebidas/>
              <ModalBebida/>
              <FavoritesModal/>
            </Container>

            <Foother/>
          </div>
        </BebidasProvider>
      </CategoriasProvider>

  )
}

export default App
