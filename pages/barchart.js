import Link from "next/link";
import styled from "styled-components";

import Head from "../components/head";
import Nav from "../components/nav";

import BarChart from "../components/BarChart";
// import DataTable from "../components/DataTable";

// const data = await import('../data/fcc-json-response-data.json')
import * as gdpData from "/Users/eddienaff/Desktop/gitToDelete/data-ui/data/fcc-json-response-data.json";

const formattedData = gdpData.data.map(x => ({ x: new Date(x[0]), y: x[1] }));

const { description } = gdpData;

export default () => (
  <div id="blah">
    <Head title="Home" />
    <Nav />
    <FlexContainer>
      <Row>
        <FlexItem>
          <StyledH1>Gross Domestic Product</StyledH1>
        </FlexItem>
        <FlexItem>
          <BarChart width={900} height={500} data={formattedData} />
        </FlexItem>
        <FlexItem>{description}</FlexItem>
      </Row>
    </FlexContainer>
  </div>
);

console.log("gdpData");
console.log(gdpData);

const StyledH1 = styled.h1`
  color: steelblue;
`;

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

var url =
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const waaa = [
  { x: new Date("Tue Apr 24 2007 00:00:00 GMT-0700 (PDT)"), y: 93.24 },
  { x: new Date("Fri Oct 12 2007 00:00:00 GMT-0700 (PDT)"), y: 167.25 },
  { x: new Date("Mon Apr 07 2008 00:00:00 GMT-0700 (PDT)"), y: 155.89 },
  { x: new Date("Thu Sep 25 2008 00:00:00 GMT-0700 (PDT)"), y: 131.93 },
  { x: new Date("Mon Mar 16 2009 00:00:00 GMT-0700 (PDT)"), y: 95.42 },
  { x: new Date("Wed Sep 02 2009 00:00:00 GMT-0700 (PDT)"), y: 165.18 },
  { x: new Date("Thu Feb 18 2010 00:00:00 GMT-0800 (PST)"), y: 202.93 },
  { x: new Date("Thu Aug 05 2010 00:00:00 GMT-0700 (PDT)"), y: 261.7 },
  { x: new Date("Tue Jan 25 2011 00:00:00 GMT-0800 (PST)"), y: 341.4 },
  { x: new Date("Mon Jul 18 2011 00:00:00 GMT-0700 (PDT)"), y: 373.8 },
  { x: new Date("Fri Jan 06 2012 00:00:00 GMT-0800 (PST)"), y: 422.4 }
];
