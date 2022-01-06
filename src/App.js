import logo from './logo.svg';
import './App.css';
import SearchBar from './component/SearchCountry/SearchBar';
import { useEffect, useState } from 'react';
import CountryName from './utils/CountryName';

function App() {
  const [query , setQuery] = useState("");
  const [isLoading , setLoading] = useState(false);
  const [suggestion , setSuggestion] = useState([]);
  useEffect(() => {
    if(query == ""){
        setSuggestion([]);
    }
    else{
       let out = CountryName.filter((item) => 
        item.country.toLowerCase().indexOf(query) !== -1 ? true : false
       )
       .map((item) => item.country)
       setSuggestion(out);
    }
},[query])
  return (
    <div className="App">
      <h3>Search Country Name</h3>
      <p>{query}</p>
     <SearchBar 
     isLoading={isLoading}
     setLoading={setLoading}
     suggestion={suggestion}
     value={query}
     onChange={(value) => setQuery(value)}
     />
    </div>
  );
}

export default App;
