import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import {useThrottle} from "use-throttle"

const SearchBrWappped = styled.div`
  border : 1px solid black;
  border-radius : 20px;
  padding : 10px;
  display : flex;
  postion : relative;
  width:500px;
  margin-left : 400px
`;

const IconImage = styled.img`
   height : 20px;
   padding-rigth  :20px;
`;
const Input = styled.input`
  border:none;
  outline : none;
  flex:1;
`;

const RightSide = styled.div`
  display:flex;
  flex : 0 0 auto;
  padding-right : 10px;
`;

const Spinner = styled.div`

    border: 2px solid #f3f3f3; /* Light grey */
    border-top: 2px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 14px;
    height: 14px;
    margin-left : 13px;
    animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuggestionBox = styled.div`
 display : ${({len}) =>(len !== 0 ? "Flex" : "none")};
 flex-direction : column;
 felx : 0 0 auto;
 max-height :150px;
 overflow : auto;
 border-bottom-right-radius : 20px;
 border-bottom-left-radius : 20px;
 border : 1px solid black;

 & * {
     flex  :1;
     padding : 5px;
     text-align : left;
     padding-left : 30px;
 }
 & :nth-child(${({ active }) => active}) {
    background: gray;
    color: white;
    font-weight: bold;
  }
  & : nth-child(n + ${({limit}) => limit+1}){
      display : none;
  }
`;

const SearchBar = ({isLoading,setLoading,suggestion,value,onChange}) => {
    const [query , setQuery] = useState("");
    const [active ,setActive] = useState(0);
    const scrollRef = useRef();

    const throllerText = useThrottle(query , 5000);
    useEffect(() => {
      onChange(throllerText) 
    },[throllerText,onchange])

   const handleChange = (e) => {
       setQuery(e.target.value);
      
       setLoading(true);
       setTimeout(() => {
           setLoading(false);
       },1000)
   }

   const handleChangeActive = (e) =>{
       console.log(e.keyCode,active);
       switch(e.keyCode){
        case 40 : {
         setActive((prev) => prev+1);
         break;
        }
        case 38 : {
            if(active === 1){
                setActive(0);
            }
            else if(active <= 0){
                setActive(suggestion.length);
            }
            else{
                setActive((prev) => prev-1);
           }
         break;
        }
        case 13 : {
            alert(suggestion[active -1]);
            break;
        }
        default : {
               return
           }
       }
   }

   const handleClear = () => {
       setQuery("");
       onChange("");
       setLoading(false);
   }

  
    return(
        <>
        
        <SearchBrWappped onKeyUp={handleChangeActive}>
          <IconImage  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEX///8rAAAAAAApAAAmAAAnAAAbAAAkAAAhAAAdAAAQAAAZAAAWAAANAAAgAAATAAD29PTl4uLX09Pv7OzJw8OwqKiZjo5wYGBlVFR2Z2fOycm/uLiLf39bSEhTPj76+fmon59+cHDh3d1KMzM4GRk9ISE1ExOflZVIMDBzZGS6s7OFeHiSh4dPOjprWVlDKSkzDAxBj7VyAAAJvklEQVR4nO2dZ3fzKgyAX+PEG+/s5awmzWjy/3/dTZcBG7tJY4FvD8/HntRCNkhCgPj3T6FQKBQKhUKhUCgUCoVCoVAoFGIIk2gV31hFyUJ2WxomSrPj7Go4COEPEA6sy2DaG4eyW9YAYXqauchxfVPXaPSuZXsYvQyyWHYTnyHerZFjmFo1uuVi562XyG7pr4inV2R0arTLsTw0z/5vSobZBtn6z8p9Y7pomMpu9AOsRtjt3q/el5JY2/1PLM94hvxH1ftAd9H0f9BZ4zmqMy0/YKNjy79jNHxGv08d+7KVqGExfVa/d1xzIluRKiamUd92vdsxb3T0eiuro1krh2P4hiob3vFdB2P/5XKeDWez9VZzb4GbYVX+3kSZbHXKpHaFATVdjNbLLF3RJmSRxJPdQEOOXRET4FnbLM6R+wF1H7vDmsjzFrXukccdu1bQqgggXHu8RmL7OP7xf5PDkKukjk4CWn4nsVtuoe7i0c/qfbLonXlBgjMDbfUDHMo9tONo2UMDabVEZUNsb9thU3eo2LIuvjzu0sJTUNLRNFYADX6UaVFBPdj8zmUvTqW+2sXyJ8hLXOxaXvbrhyUjVPAeOrp3MEOxdIotWj6VZYovQbtUPBa+oKE93Z5d4TPqSGZH7RcURMsGHrraugUV5ZmbHmtkOqihScGSfW7XkuU0xmxD7G3U1JMLHtbcNPXgx0gw0wyvyQikECXZbw0++362TCPwsdGHJxuLebqMif+IiUAazz0s1jbzfPE+48AMQrRrXsKcVlG3RM8XE8ZPwEzJz3QM5w8hRNQwpwch1Ci50GMR92CEVNCjP2HQrJEhhBod3jgivWJIR6M23EQ1oh2SL9JlDKgR0oF0x0xQgcRlbmJGbmORDI8d1Vu6L5CSGC7U8EAHWFkzytoEGaysnANlZuwRsLDQIENRNwTtcHihZOrg0lJqSLhigrcDNTREDH7arGEhH/FKPqE/ECAv9IhAFyA6LDGhRqEjJFjskdSN7guQR8Vrnog3emNLNgUE8LHbigx83QSX9gllbLpbcGlHX+T7/OJM+g185o2MQl2DlpUzJlL9JtJ5dRzIqH8it/0wVBTlAYsakv6CgUXRUD7Ygd3HEJIxb09BJRUgWxstWB9MdVLYOUWRE8l7wfad1zzSN8+ggopEpPM4oJEiWa73xKZN/u1zWwM6PGJitZHg7F6WL9eAOn0ixpwDiuFBdVMEmJIivsLN4KTwIcFpAOgvyD4t8Wt60zwFbsNttCE9RVjQTUhzpw84Qia5NzTFL3dRwYYLJmSXu10hc+0CWzJEwIKNUe7vHQkbJCjpYD7/kpszSINdxS53VXCGnEx+4UZCNcTUgBnTMI9oOmKD0k9I/sSCsnPEWQDPYPiE8O6C5BIAfW4NuaXRoZZoyECQ4Szo1QQoM0Cmv6KnTp+c8wkUApLQy2eHkLFvNSTuR0DLF2TuBDvNroK4fCh3rDSERmn4PJSlkaIhvKU55BrK8RZkXQ/KW8j2+Jvc40OtXciO2vLMvn4FkkBF3q9AIuoQEHmT2ZPwbOk75AXDZYnIllYbSkQN1AwYLK+/lZrFyARkMV6lZqKWeRIFLuDoG/BvsRoqDwaWTSQZYQlpDCojDLeUT2X1u2BCqiCGBjIPRpaaxa/MkHVuyCVSmatrFyGrayTtbIo+Z52IWSGVuMpNpm5gucQPyMYd0RMoMnXyoY53fPBGdpuI7aaJqN0mZBIseMdQnzLjoDuhqVdpCJ0javns1wQ+4jUjO/cCWEkM1NbrAPiABzFpAjfQMltoHeDt+gtqE7S4QzrUMSQL+ggLNYfRHOD+QqDGBgaft1GvU9g26LHYjrMmG5JFnbTaU3ugBQx+akOy7go5pEOfJBMikaq2ZkNvnH9n4ROBYpwwdUhHwOmHm22jTq0LivdJfCHiWCd9UFZUHNWjjue5oIH+O9T7FHSS7MaGKr8KfQJxQPVRUSfJ2GOdugeaHKYP/gs4sJozpI4fm3tAQeypcYE7QBJasAGXO03oasuW0Dn3jq7IhcEs3IauviF4rWTPyM5ghMzp4iYYSEgVEVueBiRaHNI1fizhS5Y9DK3ikC5qBmyy+Q1gqxxlTT9/xlRtE2lHc65M2fWGC0WFe+YFBkIPO37DDkUNN5leiK5MqS9fUq3WlFXRXTcWNaZs7cSOJutOk0JtVtNuKIdyYp+rB0KTzwxHtrZnM8WNk3Oh7LLU4pejQrVR7/L0ymkPF8ouY7llr98K77vz5GeM5qWatrJvEhgUvqLmar93XdyrB2TsbGEYFV+6js+/bFNm8K4ekFmh9ZNSMWjNRPPHdVxkvse/SkBehdZvsnLFchPtH0v5Jye3Qr/3p8GXbPmB1CnfcNAJnOndvWsyREbdnReAZf3uJHrhDSAbbft3KJkuDeenq008Eannel5Lg/GdroHM5aE6IlnE2RA5/h0XQ2Ep+64ZDkVH/YXue8gc9g9xwVpE495x7WHOrQp8pEyfWJKSryZamoaHEb7OZ2+vo9FgONubCDmeX3lnWafoZDXJsdsXvaD+Jiu9Y5rWDdPs1vdLZz12S3/UXdk+40b42sRtSLaTFZJ5n5ibNtwLGa/xwxeusVhft3Zdyu/Kl7F/vsxkg++6ErBKv8GX5Y04xtkF36VwH5P9b/uqjV6JZzlwVITLPT/IeFYfonDpeJi9OW/qlH8EXQ/2fqJTBz9yRaBuoHMp5frGCZSkX1lCkY48fN81lqaLXvq8wGdtlX6rY3k5Gw7pdIM8v9a4moaD5ruK6HWhcSJ6rWXXlUWH5RZjzzaLeuqmZQTInffTGi8XBeVOYK3Ftf5ewvhwetu77/cdO04QOBgjhLTZaDf5scfFHINqyLns4g4W0Soep5M0HceruwMwns9wpKT4wThx4nmYxTxpjMpBuMj68yKYlx2rjmWn3xpl8VIOArvCrywBJeFk4cyL7FY1Cs9n2KJvZYFlwlER7GYUOex4PiOT3apGWXKucm1B+q1JZjZHxT/lMwqXoH26RaMF6bfmSDhpA/lLNo2y4hhUWdtQgEg5KrZgyaZJMl76TfYyf7MceesZrUm/NcKQl35rwZJNg3CS/X/MZ4R6OXUHupdePFF5W4QWtCXZ3wxjjkH9Y+Fbr6yilLpVgJzKSzZtWs5ogkEp/Sa8EAk059KSzR8bif8W1+KSjdgKDwKIiuk3XdLl5HCU0m8yKsjBUlyykVM0FpQ+m36TU1IVliOjoowaeeAsaRW9vzVN/KJPReF/bJb4Tep9Z1G7UGVpZRMu0ceOlu4fWzOliY4mwuj6dxV8J4pbtYtIoVAoFAqFQqFQKBQKhUKhUChaz38zYIB15fkSFgAAAABJRU5ErkJggg==" />
         <Input value={query}  onChange={handleChange} />
         <RightSide>
           { query && <div onClick={handleClear}>X</div> }
           { isLoading && <Spinner />}
         </RightSide>
        </SearchBrWappped>
        {!isLoading && <SuggestionBox active={active} limit={5}>
        {suggestion.map((item,index) => (
            <div  key={item} onMouseOver={() => setActive(index+1)}>{item}</div>
        ))}
              </SuggestionBox>}
        </>
    )
}
export default SearchBar;