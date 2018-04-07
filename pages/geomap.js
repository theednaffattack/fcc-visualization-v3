import Link from "next/link";
import styled from "styled-components";

import Head from "../components/head";
import Nav from "../components/nav";

import GeoMercator from "../components/GeoMercator";
import topology from '../static/meteor-strike-data.json';
import meteorStrikes from '../static/meteor-strike-data.json';

// import DataTable from "../components/DataTable";

// const data = await import('../data/fcc-json-response-data.json')
// import * as gdpData from "/Users/eddienaff/Desktop/gitToDelete/data-ui/data/fcc-json-response-data.json";


// const formattedData = gdpData.data.map(x => ({ x: new Date(x[0]), y: x[1] }));
// const formattedAlpsData = alps.data.map(x => ({ x: new Date(x[0]), y: x[1] }));
// from MDN:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
// new Date(year, month [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
// new Date(year, month [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
// var t = new Date(2012, 0, 1, 0, x["Time"]);


const  description  = "";

export default () => (
  <div id="blah">
    <Head title="Home" />
    <Nav />
    <FlexContainer>
      <Row>
        <FlexItem>
          <StyledH3>Global</StyledH3>
          <StyledH1>Meteor Strikes</StyledH1>
        </FlexItem>
        <FlexItem>
          <GeoMercator width={900} height={500} data={meteorStrikes} projectionFunc={meteorStrikes} />
        </FlexItem>
        <FlexItem>{description}</FlexItem>
      </Row>
    </FlexContainer>
  </div>
);
// console.log("meteorStrikes")

// console.log(meteorStrikes)

const StyledH1 = styled.h1`
  color: #ca1f73;
  margin-top: 6px
`;

const StyledH3 = styled.h2`
color: steelblue;
margin-bottom: 0;
`

const FlexContainer = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  width: 100%;
`;

const FlexItem = styled.div`
  /* background-color: tomato; */
  padding: 5px;
  width: 100%;
  height: 100%;
  margin: 10px;
  text-align: center;
`;

const FlexHeader = styled.span`
  background: tomato;
  padding: 5px;
  width: 200px;
  height: 150px;
  margin: 10px;
  line-height: 150px;
  color: white;
  font-weight: bold;
  font-size: 3em;
`;
