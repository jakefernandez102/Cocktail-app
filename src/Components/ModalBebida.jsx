import { useEffect, useState } from 'react';
import { Button, Image, Modal, Toast } from 'react-bootstrap';

import { useBebidas } from '../hooks/useBebidas';

const ModalBebida = () => {

    const {
        modal, 
        handleModalClick,
        handleFavoritesModal,
        receta,
        setReceta, 
        cargando,
        handleAddFavorite,
        favoriteBebidas,
        deleteBebida,
        bebidaId} = useBebidas()
    const [show, setShow]=useState(false)
    const [existeFavorito,setExisteFavorito] = useState(false);

    const showIngredients = () =>{
        let ingredients = [];

        for (let i = 1; i < 16; i++) {
            if(receta[`strIngredient${i}`]){
                ingredients.push(
                    <li key={i} >{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredients;
    }
    useEffect(()=>{
        let existe = favoriteBebidas.some(bebida => bebida.idDrink === bebidaId) 
        setExisteFavorito(prevFav => prevFav = existe)
    },[bebidaId])
  return (
    
        !cargando && 
        (

            <Modal
                show={modal} onHide={() => {
                    handleModalClick()
                }}
                >
                <Toast
                    bg={'success'}
                    onClose={() => setShow(false)} show={show} delay={3000} autohide
                >
                        <Toast.Header>
                            <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                            />
                            <strong className="me-auto">Cocktail Added to Favorites.</strong>
                            <small>1s ago</small>
                        </Toast.Header>
                        <Toast.Body>Go check your favorites in the star button</Toast.Body>
                </Toast>
                <Image
                    src={receta.strDrinkThumb}
                    alt={`Recipe's Image: ${receta.strDrink}`}            
                    />
                <Modal.Header>
                    <Modal.Title style={{color:'#f0af3f',fontFamily:"'Caprasimo', cursive"}}>
                        {receta.strDrink}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3">
                        <h2>Instructions:</h2>
                            {receta.strInstructions}

                        <h2>Ingredients:</h2>
                            {
                            showIngredients()
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={'btn-star'}>
                        {
                        existeFavorito
                        ?
                        ( <Button 
                            variant={'danger'}
                            className={'w-100 text-uppercase mt-2'}
                            style={{fontSize:'10px'}}
                            onClick={( ) => {
                    
                                deleteBebida(bebidaId)
                                handleModalClick()
                                handleFavoritesModal()
                                
                                }
                            }
                        >
                            Delete from Favorites
                        </Button>)
                        
                        :
                        ( <Button
                                variant='warning'
                                className='btn-btn--star d-flex align-items-center gap-2 justify-content-center text-uppercase fw-bold fs-6'
                                onClick={()=>{
                                    handleAddFavorite(receta.idDrink)
                                    setShow(true)
                                    setTimeout(() => {
                                        handleModalClick()
                                        handleFavoritesModal()
                                    }, 2000);
                                }}
                                >
                                <div className='icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 200 200">
                                        <path d="M100,0 
                                            L122.47,72.5 
                                            L200,72.5 
                                            L136.55,112.5 
                                            L158.91,185 
                                            L100,147.5 
                                            L41.09,185 
                                            L63.45,112.5 
                                            L0,72.5 
                                            L77.53,72.5 
                                            Z" fill="black"/>
                                    </svg>
                                </div>
                                <p>
                                Add as Favorite
                                </p>
                            </Button>)
                        }
                    </div>
                </Modal.Footer>
                
            </Modal>
            
        )
    
  )
}

export default ModalBebida
