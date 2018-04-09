import Link from "next/link";
import styled from "styled-components";

import Head from "../components/head";
import Nav from "../components/nav";

import HeatMap from "../components/HeatMap";


const  description  = "";

export default () => (
  <div id="blah">
    <Head title="Home" />
    <Nav />
    <FlexContainer>
      <Row>
        <FlexItem>
          <StyledH3>HeatMap</StyledH3>
          <StyledH1>Of Interesting Stuff</StyledH1>
        </FlexItem>
        <FlexItem>
          <HeatMap 
            width={800}
            height={480}
            />
        </FlexItem>
        <FlexItem>{description}</FlexItem>
      </Row>
    </FlexContainer>
  </div>
);

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
