//main component to handle conversion of currencies
import { useState } from "react";

//currently dummy data
export default function Converter() {
    const [currencies, setCurrencies] = useState({
        USD: { name: "US Dollar", value: 1.0 },
        EUR: { name: "Euro", value: 0.88 },
        GBP: { name: "British Pound", value: 0.76 },
        AUD: { name: "Australian Dollar", value: 1.31 },
        CAD: { name: "Canadian Dollar", value: 1.23 },
        JPY: { name: "Japanese Yen", value: 114.74 },
        CNY: { name: "Chinese Renminbi", value: 6.47 },
        INR: { name: "Indian Rupee", value: 74.83 },
        BRL: { name: "Brazilian Real", value: 5.17 },
      });
    
    //return the wepage component
    return(
        <div className="outerConverterContainer">
            <div className="converterContainer">
                <div className="converterFromContainer">
                    <label htmlFor="selecterFrom" className="selectorBoxLable">Convert From:</label>
                    <select id="selecterFrom">
                        {/*populates select menu with options*/}
                        {Object.keys(currencies).map((key) => (
                            <option key={key} value={key}>
                                {currencies[key].name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="inputContainer">
                    <label htmlFor="inputCurrency" >Amount:</label>
                    <input id="inputCurrency" type="number" />
                </div>

                <div className="converterToContainer">
                <label htmlFor="slecterTo" className="selectorBoxLable">Convert To:</label>
                    <select id="selecterTo">
                        {/*populates select menu with options*/}
                        {Object.keys(currencies).map((key) => (
                            <option key={key} value={key}>
                                {currencies[key].name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="resultsContainer">
                <p>results go here</p>
            </div>
        </div>
    );
}