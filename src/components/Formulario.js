import React,{useEffect, useState} from 'react';
import styled from '@emotion/styled';

import Error from '../components/Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor:pointer;

    }
`;

const Formulario = () => {

    //state del listado de criptomonedas
    const [listacripto,guardarCriptomonedas] = useState([]);

    //error
    const [error, guardarError] = useState(false);


    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'COD', nombre: 'Peso Colombiano'}
    ]

    //utilzar useMoneda
    const [moneda,SelectMonedas] = useMoneda('Elige tu Moneda','',MONEDAS);

    //utilizar useCriptomoneda
    const [criptoMoneda,SelectCripto] = useCriptomoneda('Elige tu Criptomoneda','',listacripto);

    //Ejecutar un llamado a la API
    useEffect(()=>{
        const consultarAPI = async() =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            
            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    //cuando el usuario hace submit
    const cotizarMoneda = e =>{
        e.preventDefault();
        //validar si ambos campos estan llenos
        if(moneda === '' || criptoMoneda === ''){
            guardarError(true);
            return;
        }

        //pasar los datos al componente principal
        guardarError(false);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
        <SelectMonedas></SelectMonedas>
        <SelectCripto></SelectCripto>
        <Boton
            type = "submit"
            value= "Calcular"
        ></Boton>
        </form>
     );
}
 
export default Formulario;