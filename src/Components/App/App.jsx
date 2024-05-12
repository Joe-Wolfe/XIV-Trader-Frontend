import { useEffect, useState } from 'react'
import { getMarketData } from '../../API';

import Menu from '../Menu/Menu'
import MarketTable from '../MarketTable/MarketTable'

import './App.css'
import Home from '../Home/Home';


function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [marketResults, setMarketResults] = useState([]);

  useEffect(() => {
    setIsLoading(false);
  }, []);


  return (
    <div className='app'>

      <Menu setMarketResults={setMarketResults} setIsLoading={setIsLoading} />
      {isLoading ? <p>Loading...</p> :
        marketResults.length > 0 ? <MarketTable marketResults={marketResults} setMarketResults={setMarketResults} /> : <Home />}
    </div>
  )
}

export default App
