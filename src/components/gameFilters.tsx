import { useDispatch } from 'react-redux';
import { setSelectedCurrency, setSelectedProvider } from '@/store/gamesSlice';

interface FiltersProps {
  selectedProvider: string;
  selectedCurrency: string;
  uniqueProviders: string[];
  uniqueCurrency: string[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedProvider,
  selectedCurrency,
  uniqueProviders,
  uniqueCurrency,
}) => {
  const dispatch = useDispatch();

  return (
    <div className='grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 my-3 gap-4'>
      <select
        className='border rounded py-1 px-2 cursor-pointer uppercase shadow-md'
        onChange={(e) => dispatch(setSelectedProvider(e.target.value))}
        value={selectedProvider}
      >
        <option value=''>All Providers</option>
        {uniqueProviders.map((provider) => (
          <option key={provider} value={provider}>
            {provider}
          </option>
        ))}
      </select>
      <select
        className='border rounded py-1 px-2 uppercase cursor-pointer shadow-md'
        onChange={(e) => dispatch(setSelectedCurrency(e.target.value))}
        value={selectedCurrency}
      >
        <option value=''>All Currencies</option>
        {uniqueCurrency.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
