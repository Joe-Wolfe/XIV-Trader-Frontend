import React, { useEffect } from "react"
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { getWorlds, getDataCenters, getMarketData } from "../../API"

import "./Menu.css"

const Menu = ({ setMarketResults, setIsLoading }) => {


    // Selection options 
    const [dataCenters, setDataCenters] = useState([]);
    const [worlds, setWorlds] = useState([]);


    // Secected options
    const [selectedWorld, setSelectedWorld] = useState("Adamantoise");
    const [selectedDataCenter, setSelectedDataCenter] = useState("Aether")
    const [selectedCurrency, setSelectedCurrency] = useState();


    useEffect(() => {
        getDataCenters().then((data) => {
            setDataCenters(data);
            setIsLoading(false);

        });
    }, []);

    useEffect(() => {
        getWorlds(selectedDataCenter).then((data) => {
            setWorlds(data);
        });
    }, [selectedDataCenter]);

    function retrieveMarketData(world, currency) {
        setIsLoading(true);
        getMarketData(world, currency).then((data) => {
            console.log(data);
            setIsLoading(false);
            setMarketResults(data);
        });
    }

    const handleDcChange = (e) => {
        setSelectedDataCenter(e.target.value);
        console.log(selectedDataCenter);
    }

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
        console.log(selectedCurrency)
    }

    const handleWorldChange = (e) => {
        setSelectedWorld(e.target.value);
        console.log(selectedWorld);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        retrieveMarketData(selectedWorld, selectedCurrency);
    }

    return (
        <div className="Menu">
            <h1 className="title">XIV Trader</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Col>
                        <Label for="Currency Type">Currency Type</Label>
                        <Input type="select" name="currencyType" id="currencyType" value={selectedCurrency} onChange={handleCurrencyChange}>
                            <option key={uuidv4()} value={1}>Poetics</option>
                            <option key={uuidv4()} value={2} >Comedy</option>
                        </Input>
                    </Col>

                    <Col>
                        <Label for="dataCenter">Data Center</Label>
                        <Input type="select" name="dataCenter" id="dataCenter" value={selectedDataCenter} onChange={handleDcChange}>
                            {dataCenters.map((dataCenter) => {
                                return <option key={uuidv4()}>{dataCenter}</option>
                            })}
                        </Input>
                    </Col>


                    <Col>
                        <Label for="world">World</Label>
                        <Input type="select" name="world" id="world" value={selectedWorld} onChange={handleWorldChange}>  {/*this section should is static*/}
                            {worlds.map((world) => {
                                return <option key={uuidv4()}>{world}</option>
                            })}
                        </Input>
                    </Col>

                    <Button className="submit">Submit</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Menu;