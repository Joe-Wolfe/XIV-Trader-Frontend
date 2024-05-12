import "./MarketData.css";

//  This component will have rows of data that will be displayed in a table.
/*
<tr>
    <th>Item</th>
    <th>Cost</th>
    <th>Average Price</th>
    <th>Minimium Price</th>
    <th>Sells per day</th>
    <th># of listings</th>
</tr>
*/
const MarketData = (data) => {
    function getCurrency() {
        let currency = data.marketResult.cost;
        return currency === 1 ? "Poetics" : "Allegory";
    }

    let { itemName, cost, averagePrice, minPrice, regularSaleVelocity, listingsCount } = data.marketResult;

    //Toggle between cost per item and cost per tomestone
    if (data.isChecked) {
        averagePrice /= cost;
        averagePrice = parseFloat(averagePrice.toFixed(4));
        minPrice /= cost;
        minPrice = parseFloat(minPrice.toFixed(4));
    }

    regularSaleVelocity = parseFloat(regularSaleVelocity.toFixed(2));

    return (
        <>
            <tr>
                <td className="MarketDataTd">{itemName}</td>
                <td className="MarketDataTd">{cost} {getCurrency()}</td>
                <td className="MarketDataTd">{averagePrice}</td>
                <td className="MarketDataTd">{minPrice}</td>
                <td className="MarketDataTd">{regularSaleVelocity}</td>
                <td className="MarketDataTd">{listingsCount}</td>
            </tr>
        </>
    )
}

export default MarketData;
