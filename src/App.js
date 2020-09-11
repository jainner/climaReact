import React, { Fragment, useState, useEffect } from "react";
import Header from "./component/header";
import Formulario from "./component/formulario";
import Clima from "./component/clima";
import Error from "./component/error";

function App() {

	const [busqueda,guardarBusqueda] = useState({
		ciudad:'',
		pais:''
	})
	const [consultar,guardarConsultar]= useState(false)
	const [resultado,guardarResultado]= useState({})
	const [error,guardarError] = useState(false)

	const {ciudad,pais} = busqueda

	useEffect(()=>{
		const consultarApi = async () =>{
			if(consultar){
				const appId = '65a133ed800f57cc8ee90ed014e44194'
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

			const respuesta = await fetch(url,{method:'post'})
			const resultado = await respuesta.json()
			
			guardarResultado(resultado)
			guardarConsultar(false)

				if(resultado.cod === '404'){
					guardarError(true)
				}else{
					guardarError(false)
				}
			}
		}
		consultarApi()
	},[consultar,ciudad,pais])

	let component
	if(error){
		component = <Error mensaje='No hay resultado'/>
	}else{
		component = <Clima resultado={resultado}/>
	}

  return (
    <Fragment>
      <Header titulo="Clima react app" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
				<Formulario
					guardarConsultar={guardarConsultar}
					busqueda={busqueda} 
					guardarBusqueda={guardarBusqueda}
				/>
			</div>
            <div className="col m6 s12">
				{component}
			</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
