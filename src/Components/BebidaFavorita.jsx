import { Button, Card, Col } from 'react-bootstrap';

import { useBebidas } from '../hooks/useBebidas';

/* eslint-disable react/prop-types */
const BebidaFavorita = ({bebida}) => {

        const {deleteBebida} = useBebidas()
        
  return (
    <Col
        md={6}
        lg={3}
    >
        <Card
            style={{height:'350px', boxShadow:'0px 0px 5px rgb(181 181 181 /.5),0px 0px 15px rgb(181 181 181 /.7),0px 0px 20px rgb(224 224 224 /1)'}}
            className={'card-bebida mb-4 overflow-hidden'}
        >
            <div className='overflow-hidden'>
                <Card.Img
                    variant='top'
                    src={bebida.strDrinkThumb}
                    alt={`Image of ${bebida.strDrink}`}
                    className={'card-image overflow-hidden'}
                    
                />
            </div>
                <Card.Header >
                    <Card.Title  style={{color:'#e0b132', fontFamily:"'Caprasimo', cursive", fontSize:'16px'}}>{bebida.strDrink}</Card.Title>
                </Card.Header>
            <Card.Body className={'d-flex flex-column justify-content-end '}>

                <Button 
                    variant={'danger'}
                    className={'w-100 text-uppercase mt-2'}
                    style={{fontSize:'10px'}}
                    onClick={( ) => {
                        
                        deleteBebida(bebida.idDrink)
                        }
                    }
                >
                    Delete from Favorites
                </Button>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default BebidaFavorita
