import { Table, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import sortByParameter from "../../helpers/dataSorter";
import MarketData from "../MarketData/MarketData";

import "./MarketTable.css";

// Market Table component
const MarketTable = ({ marketResults, setMarketResults }) => {

    // changes between showing the data per item or per tomestone
    const [isChecked, setIsChecked] = useState(false);

    // sorting parameters
    const [sortedBy, setSortedBy] = useState();
    const [ascending, setAscending] = useState(true);

    //pagination parameters
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = marketResults.slice(indexOfFirstItem, indexOfLastItem);


    //handle the checkbox change
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    }

    //handle the pagination
    function handlePageChange(event) {
        setCurrentPage(Number(event.target.id));
    }

    //each column of the table should be sortable
    const sortData = (parameter) => {
        console.log("Sorting by " + parameter);
        setCurrentPage(1);


        //if we are sorting while the data is displayed per Tomestone, we need to change the sorting parameter
        let isPerTomestone = false;
        if (parameter === "averagePrice" || parameter === "minPrice") {
            isPerTomestone = isChecked;
        }

        //the first time we click on a column, we sort it in ascending order, second time in descending order
        if (sortedBy === parameter) {
            setAscending(!ascending);
        }
        else {
            setAscending(true);
        }
        setMarketResults(sortByParameter(marketResults, parameter, ascending, isPerTomestone));
        setSortedBy(parameter);
    }

    return (
        <div className="MarketTable">

            <FormGroup check className="MarketTableCheckBox">
                <Label check>
                    <Input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />{' '}
                    {isChecked ? "Show data per Tomestone" : "Show data per Item"}
                </Label>
            </FormGroup>

            <Table dark striped bordered hover responsive className="table">
                <thead>
                    <tr>
                        <th onClick={() => sortData("itemName")}>Item</th>
                        <th onClick={() => sortData("cost")}>Cost</th>
                        <th onClick={() => sortData("averagePrice")}>Average Price {isChecked ? "/ Tomestone" : null}</th>
                        <th onClick={() => sortData("minPrice")}>Minimium Price {isChecked ? "/ Tomestone" : null}</th>
                        <th onClick={() => sortData("regularSaleVelocity")}>Sells per day</th>
                        <th onClick={() => sortData("listingsCount")}># of listings</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((marketResult, index) => {
                        return (
                            <MarketData key={index} marketResult={marketResult} isChecked={isChecked} />
                        )
                    })
                    }
                </tbody>
            </Table>
            <button className="MarketTableButton" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>← Previous</button>
            <button className="MarketTableButton" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(marketResults.length / itemsPerPage)}>Next →</button>
        </div>
    );
}

export default MarketTable;