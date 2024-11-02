import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';

import CurrencyConverter from './components/CurrencyConverter';
import { ConversionProvider } from './context/ConversionContext';

function App() {
  return (
    <ConversionProvider>
      <CurrencyConverter />
    </ConversionProvider>
  );
}

export default App;
