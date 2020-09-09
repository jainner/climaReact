import React, { Fragment, useState, useEffect } from "react";
import Header from "./component/header";
import Formulario from "./component/formulario";
import Clima from "./component/clima";

function App() {

	const [busqueda,guardarBusqueda] = useState({
		ciudad:'',
		pais:''
	})
	const [consultar,guardarConsultar]= useState(false)
	const [resultado,guardarResultado]= useState({})

	const {ciudad,pais} = busqueda

	useEffect(()=>{
		const consultarApi = async () =>{
			if(consultar){
				const appId = '65a133ed800f57cc8ee90ed014e44194'
			const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

			const respuesta = await fetch(url)
			const resultado = await respuesta.json()
			
			guardarResultado(resultado)
			guardarConsultar(false)
			}
			
		}
		consultarApi()
	},[consultar,ciudad,pais])

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
				<Clima
					resultado={resultado}
				/>
			</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
