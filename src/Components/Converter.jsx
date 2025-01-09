export default function Converter() {
    return(
        <div className="outerConverterContainer">
            <div className="converterContainer">
                <div className="converterFromContainer">
                    <label for="selecterFrom" className="selectorBoxLable">Convert From:</label>
                    <select id="selecterFrom">
                        <option value="Currency1">Currency 1</option>
                        <option value="Currency2">Currency 2</option>
                        <option value="Currency3">Currency 3</option>
                    </select>
                </div>

                <div className="inputContainer">
                    <label>Amount:</label>
                    <input type="number" />
                </div>

                <div className="converterToContainer">
                <label for="slecterTo" className="selectorBoxLable">Convert To:</label>
                    <select id="selecterTo">
                        <option value="Currency1">Currency 1</option>
                        <option value="Currency2">Currency 2</option>
                        <option value="Currency3">Currency 3</option>
                    </select>
                </div>

            </div>
            <div className="resultsContainer">
                <p>results go here</p>
            </div>
        </div>
    );
}