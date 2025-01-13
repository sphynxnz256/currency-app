//main component to handle conversion of currencies
import { useState, useEffect } from "react";
import { getCurrencyName } from "currency-iso";

//currently dummy data
export default function Converter() {
    const [result, setResult] = useState("");
    const [currencies, setCurrencies] = useState(null);



    //function to handle convert button click
    function handleConvertButtonOnClick () {
        const amountToConvert = document.getElementById("amountToConvert").value;
        if(amountToConvert !== "") {
            const currencyFromCode = document.getElementById("selecterFrom").value;            
            const currencyFromValue = currencies[currencyFromCode];            
            const currencyToCode = document.getElementById("selecterTo").value;
            const currencyToValue = currencies[currencyToCode];            
            const result = (amountToConvert * (currencyToValue / currencyFromValue)).toFixed(2);
            setResult(`${result} ${currencyToCode}`);
        }
    }

    //useEffect to get API data and store it in localStorage
    useEffect(() => {
        async function fetchAPIData() {
            const EXCHANGE_RATE_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
            const url = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_KEY}/latest/USD`;

            const today = (new Date()).toDateString();
            const localKey = `EXCHANGE_RATE-${today}`;
            if (localStorage.getItem(localKey)) {
                const apiData = JSON.parse(localStorage.getItem(localKey));
                setCurrencies(apiData.conversion_rates);
                console.log(apiData.conversion_rates);
                console.log("data fetched from cache");
                return;
            }

            localStorage.clear();
            try {
                const res = await fetch(url);
                const apiData = await res.json();
                localStorage.setItem(localKey, JSON.stringify(apiData));
                setCurrencies(apiData.conversion_rates);
                console("data fetched from API");
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchAPIData();
    }, []);
    
    //return the wepage component
    return(
        <>
            {currencies ? (
                //normal app screen
                <div className="outerConverterContainer">
                    <div className="converterContainer">
                        <div className="converterFromContainer">
                            <label htmlFor="selecterFrom" className="selectorBoxLable">Convert From:</label>
                            <select id="selecterFrom">
                                {/*populates select menu with options*/}
                                {currencies && Object.keys(currencies)
                                    .filter(key => getCurrencyName(key))
                                    .sort((a, b) => getCurrencyName(a).localeCompare(getCurrencyName(b)))
                                    .map(key => (
                                    <option key={key} value={key}>
                                        {getCurrencyName(key)} ({key})
                                   </option>
                                    ))}
                            </select>
                        </div>

                        <div className="inputContainer">
                            <label htmlFor="amountToConvert" >Amount:</label>
                            <input id="amountToConvert" type="number" 
                                placeholder="Enter Amount"/>
                        </div>

                        <div className="converterToContainer">
                        <label htmlFor="slecterTo" className="selectorBoxLable">Convert To:</label>
                            <select id="selecterTo">
                                {/*populates select menu with options*/}
                                {currencies && Object.keys(currencies)
                                    .filter(key => getCurrencyName(key))
                                    .sort((a, b) => getCurrencyName(a).localeCompare(getCurrencyName(b)))
                                    .map(key => (
                                    <option key={key} value={key}>
                                        {getCurrencyName(key)} ({key})
                                   </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="resultsContainer">
                        <button onClick={handleConvertButtonOnClick}>Convert</button>
                        <p id="resultsText">Result: {result}</p>
                    </div>
                </div>
            ) : (
                //loading screen for if we are still getting api data
                <div className="loadingState">
                    <i className="fa-solid fa-gear"></i>
                </div>
            )}
        </>

    );
}