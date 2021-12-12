import { useState } from "react";
import axios from "axios";
import "./module.css";

const data = ({ismeal,baseURL}) => {
    console.log(baseURL,"url")

    const da = `${baseURL}${ismeal}`;
    console.log(da,"da")
    const config = {
        url:`${baseURL}${ismeal}`,
        method: "get"
    }
    return axios(config)
}

const Search = () => {
   const [isAuth,setAuth] = useState(false);
    const[ismeal,setMeal] = useState();
    const [isdata , setData] = useState();
    const baseURL = process.env.REACT_APP_BASE_URL;

    const handleChange = (e) => {
        setMeal(e.target.value)
    }

    

    
    const onSubmit = () => {
         data({ismeal,baseURL})
         .then((res) => {
             setData(res.data.meals);
             setAuth(true);
         })
         .catch((err) => {
             console.log(err);
         })
    }
 
    return(
        <>
        <div className="search_box">
            <div className="pages_heading">
            <h3>Get App</h3>
            <div className="pages_set">
                <h3>Add resturant</h3>
                <h3>Login</h3>
                <h3>Sign up</h3>
            </div>
            </div>
            <h1 className="heading">ZOMOTO</h1>
            <h1 className="heading">Discover the best food</h1>
            <input placeholder="Meal"  onChange={handleChange} className="input_box"/><br />
            <button onClick={onSubmit}  className="btn_search">Search</button>
        </div>
        {
            isAuth ? 
        <div> 
          {isdata.map((item) => (
              <div key={item.idMeal} className="search_data">
                  <h3>{item.strMeal}</h3>
                  <img src={item.strMealThumb}  width="300px"/>

              </div>
          ))}
            
        </div> : <div></div>
        }
        </>
    )
}
export default Search;