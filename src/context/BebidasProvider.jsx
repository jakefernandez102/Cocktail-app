import axios from 'axios';
import { createContext, useEffect, useState } from 'react';



/* eslint-disable react/prop-types */
const BebidasContext = createContext();


const BebidasProvider = ({children})=>{

    const favBebidasLS = JSON.parse(localStorage.getItem('favorit')) ?? [];
    const [bebidas,setBebidas] = useState([]);
    const [favoriteBebidas,setFavoriteBebidas] = useState(favBebidasLS);
    const [modal,setModal] = useState(false);
    const [favoritesModal,setFavoriteModal] = useState(false);
    const [bebidaId, setBebidaId] = useState(null);
    const [receta,setReceta ] = useState([]);
    const [cargando, setCargando] = useState(false)

    const askCocktail = async (busqueda) =>{
        try {
            console.log(busqueda)
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${busqueda.category}&i=${busqueda.name}`;
            const {data} = await axios(url);
            setBebidas(data.drinks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(!bebidaId) return;
        
        const getRecipe = async () =>{
            try {
                setCargando(true);
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const {data} = await axios(url);
                setReceta(data.drinks[0])
            } catch (error) {
                console.log(error)
            } finally{
                setCargando(false)
            }

        }
        getRecipe()
    },[bebidaId])

    useEffect(() => {
        localStorage.setItem('favorit', JSON.stringify(favoriteBebidas));
    }, [favoriteBebidas]);

    const handleBebidaIdClick = (id) =>{
        setBebidaId(id)
    }
    const handleModalClick = () => {
        setModal(!modal) 
    }
    const handleFavoritesModal = () =>{
        setFavoriteModal(!favoritesModal)
    }
    const handleAddFavorite = (idDrink) =>{
        addFavorites(idDrink)
    }
    
    const addFavorites = (idDrink)=>{
    
        const bebidaSelected = bebidas.filter(bebida => bebida.idDrink === idDrink);

        if(favoriteBebidas.some(bebida => bebida.idDrink === idDrink)){
            console.log('lo tengo no lo agrego')
            setFavoriteBebidas(prevFavoriteBebidas => [...prevFavoriteBebidas]);
            console.log(favoriteBebidas)
        
        }else{
            console.log('no lo tengo, lo agrego')
           setFavoriteBebidas(prevFavoriteBebidas => [...prevFavoriteBebidas, bebidaSelected[0]]);
            console.log(favoriteBebidas)
        }
        
    }
    const deleteBebida = (idDrink) =>{
        const bebidaSelected = favoriteBebidas.filter(bebida => bebida.idDrink !== idDrink);
        setFavoriteBebidas([...bebidaSelected])
    }

    return(
        <BebidasContext.Provider
            value={{
                askCocktail,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaIdClick,
                receta,
                setReceta,
                cargando,
                handleFavoritesModal,
                favoritesModal,
                handleAddFavorite,
                favoriteBebidas,
                deleteBebida,
                bebidaId
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider 
}
export default BebidasContext;