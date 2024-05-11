import {useState, useEffect} from 'react';
import Header from "./components/Header";
import Button from './components/Button';

import {formatearDinero, cantidadPagar} from './helpers'

function App() {

  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect(() => {
    const resultado = cantidadPagar(cantidad, meses);
    setTotal(resultado);

  }, [cantidad, meses]);

  useEffect(() =>{

    //calcular pago mensual
    setPago(total / meses);

  }, [total])

  const MIN = 0;
  const MAX = 20000;
  const step = 100;

  function handleChange (e){
    setCantidad(e.target.value);
  }

  function handleclickDecremento(){
    const valor = cantidad - step;

    if(valor < MIN){
      alert('Canitidad no valida');
      return;
    }

    setCantidad(valor);

  }

  function handleclickincremento(){
    const valor = cantidad + step;

    if(valor > MAX){
      alert('Canitidad no valida');
      return;
    }

    setCantidad(valor);

  }


  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header/>

        <div className='flex justify-between my-6'>
          <Button 
            operador='-'
            fn = {handleclickDecremento}
          />
          <Button 
            operador= '+'
            fn = {handleclickincremento}
          />
          
        </div>

        <input 
          type="range"
          className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
          onChange={handleChange}
          min={MIN}
          max={MAX}
          step={step}
          value={cantidad}
        
        />

        <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
            { formatearDinero(cantidad)}
        </p>

        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
            Elige un <span className='text-indigo-600'>plazo</span> a pagar
        </h2>

        <select
            className='mt-5 w-full p-2 bg-white border border-gray-300 rounded text-center
            text-xl font-bold text-gray-500'
            value={meses}
            onChange={e => setMeses(+e.target.value)}
        >

          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>

        </select>


        <div className='my-5 space-y-3 bg-gray-50 p-5'>
          <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
            Resumen <span className='text-indigo-600'>de pagos</span>
          </h2>

          <p className='text-gray-500 text-center font-bold'>{meses} Meses</p>
          <p className='text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a Pagar</p>
          <p className='text-gray-500 text-center font-bold'>{formatearDinero(pago)} Mensuales</p>


        </div>
     

    </div>
  )
}

export default App
