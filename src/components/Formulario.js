import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';

function Formulario(props) {

    const { guardarGasto, guardarCrearGasto } = props;
    //state
    const [ nombreGasto, guardarNombreGasto ] = useState('');
    const [ cantidadGasto, guardarCantidadGasto ] = useState(0);
    const [ error, guardarError ] = useState(false);

    

    //cuando se agrega el gasto
    const agregarGasto = e => {
        e.preventDefault();

        //validar
        if(cantidadGasto < 1 || isNaN( cantidadGasto ) || nombreGasto === '' ) {
            guardarError(true);
            return;
        }


        //construir objeto de gasto
        const gasto = {
            nombreGasto,
            cantidadGasto,
            id: shortid.generate()

        }

        //pasar el gasto al comp principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //eliminar alerta
        guardarError(false)

        //resetear el form
        guardarNombreGasto('');
        guardarCantidadGasto('');
    }

    return(
        <form
           onSubmit={agregarGasto} 
        >
            <h2>Agrega tus gastos aqui</h2>

            {error ? <Error mensaje='Ambos capos son obligatorios o presupuesto incorrecto' /> : null}

            <div className="campo">
                <label>Nombre Gasto:</label>
                <input type="text" className="u-full-width"
                placeholder="Ej. Transporte"
                onChange={e => guardarNombreGasto(e.target.value)}
                value={nombreGasto}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto:</label>
                <input type="number" className="u-full-width"
                placeholder="Ej. 200"
                onChange={e => guardarCantidadGasto(parseInt( e.target.value, 10) )}
                value={cantidadGasto}
                />
            </div>

            <input type="submit" className="button-primary u-full-width" value="Agregar gasto"/>
        </form>
    )
}

export default Formulario;