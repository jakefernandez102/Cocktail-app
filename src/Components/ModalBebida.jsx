import { Button, Image, Modal } from 'react-bootstrap';

import { useBebidas } from '../hooks/useBebidas';

const ModalBebida = () => {

    const {
        modal, 
        handleModalClick,
        receta,
        setReceta, 
        cargando,
        handleAddFavorite} = useBebidas()

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
    
  return (
    
        !cargando && 
        (
            <Modal
                show={modal} onHide={() => {
                    handleModalClick()
                    setReceta([])
                }}
            >
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
                    <Button
                        variant='warning'
                        className='text-uppercase fw-bold'
                        onClick={()=>handleAddFavorite(receta.idDrink)}
                    >
                        Add as Favorite
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    
  )
}

export default ModalBebida
