/* eslint-disable react/prop-types */
import { Container, Modal, Row } from 'react-bootstrap';

import { useBebidas } from '../hooks/useBebidas';
import BebidaFavorita from './BebidaFavorita';


const FavoritesModal = () => {

    


    const {favoritesModal,handleFavoritesModal,favoriteBebidas,cargando} = useBebidas();

    return (
    !cargando && (
        <Modal
            className={'w-100'}
            show={favoritesModal} 
            onHide={()=>{
                handleFavoritesModal();
            }}
            fullscreen='true'
            size={'xl'}
        >
            <Modal.Header>
                <Modal.Title className={'mx-auto'}>
                    Your Favorites
                </Modal.Title>
            </Modal.Header>
            <Container>
                <Row className={'p-4'}>

                {
                    favoriteBebidas.map(bebida=>(
                        
                        <BebidaFavorita
                        key={bebida.idDrink}
                        bebida={bebida}
                        />
                        ))
                    }
                </Row>
            </Container>
        </Modal>)
  )
}

export default FavoritesModal
