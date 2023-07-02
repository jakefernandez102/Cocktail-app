import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';

import { useCategorias } from '../hooks/useCategorias';
import { useBebidas } from './../hooks/useBebidas';

const Formulario = () => {  

    
    
    const [busqueda, setBusqueda] = useState({
        name:'',
        category:''});
        const {categorias}=useCategorias();
        const {askCocktail,handleFavoritesModal,favoriteBebidas}=useBebidas();
    const [alerta, setAlerta] = useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        
        // console.log(busqueda)
        // console.log(Object.values(busqueda).includes(''))
        if(Object.values(busqueda).includes('')){
            setAlerta('All fields are required');
            return;
        }
        setAlerta('');

        askCocktail(busqueda);
    }

    return (
        <Form
            onSubmit={handleSubmit}
        >
            {
                alerta && <Alert variant='danger' className='text-center'>{alerta}</Alert>
            }

            <Row>
                <Col
                    md={6}
                >
                    <Form.Group 
                        className='mb-3 '
                    >
                        <Form.Label
                            className='fw-bold'
                            htmlFor='name'
                        >
                             What kind of drink?
                        </Form.Label>
                        <Form.Control
                            id='name'
                            type='text'
                            placeholder='Tequila, Vodka, etc...'
                            name='name'
                            value={busqueda.nombre}
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </Form.Group>
                    
                </Col>
                <Col
                    md={6}
                >
                    <Form.Group 
                        className='mb-3 '
                    >
                        <Form.Label
                            className='fw-bold'
                            htmlFor='category'
                        >
                            Coctail Category:
                        </Form.Label>
                        <Form.Select
                            defaultValue=''
                            id='category'
                            name='category'
                            onChange={e => setBusqueda({
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        >
                            <option value="0">-- Select Category --</option>
                            {
                                categorias.map((categoria) => {
                                    const {strCategory} = categoria    
                                    return(
                                            <option 
                                    key={strCategory}
                                    value={strCategory}>{strCategory}</option>
                                
                                    )
                                })
                            }
                        </Form.Select>

                    </Form.Group>
                </Col>
            </Row>
            <Row 
                className='justify-content-end'
            >
                <Col
                    xs={12}
                    md={6}
                >
                    <div className={'d-flex gap-2 justify-content-between'}>
                        <Button
                            style={{border:'none'}}
                            variant='transparent'
                            onClick={handleFavoritesModal}
                            disabled={favoriteBebidas.length === 0 ? true : false}
                        >
                            <img className={'bg-warning rounded p-2'} style={{cursor:'pointer'}} width="50" height="50" src="https://img.icons8.com/3d-fluency/94/star.png" alt="star"/>
                        </Button>
                        <Button
                            variant='danger'
                            className='text-uppercase w-5'
                            type='submit'
                            >
                            Search Cocktails
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
  )
}

export default Formulario
