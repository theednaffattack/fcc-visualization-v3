import React from "react";
import { Graph } from "@vx/network";
import { scaleOrdinal, schemeCategory20c } from "d3-scale";

import { Network, withScreenSize } from "@data-ui/network";

import { NetworkWithCustomizedRenderer } from "./NetworkWithCustomizedRenderer";

import countryGraph from "../static/force-directed-countries.json";
import { getRandomID } from "../components/Network/data";

const sampleNode = {
  x: 100,
  y: 200,
  id: getRandomID(),
  size: 10,
  opacity: 1,
  fill: "#e03131",
  label: "User A",
  type: "Attr"
};

function renderTooltip({ data }) {
  const { x, y, country } = data;
  return (
    <div>
      {country && (
        <div>
          <strong>{country}</strong>
        </div>
      )}
      <div>
        <strong> x </strong>
        {x && x.toFixed ? x.toFixed(2) : x}
      </div>
      <div>
        <strong>y </strong>
        {y && y.toFixed ? y.toFixed(2) : y}
      </div>
    </div>
  );
}

const ResponsiveNetwork = withScreenSize(
  ({ screenWidth, children, networkComponent, ...rest }) =>
    React.createElement(
      networkComponent,
      {
        width: screenWidth, // Math.min(1000, screenWidth / 1.3),
        height: screenWidth / 1.3 / 1.8, // Math.min(1000 / 1.8, screenWidth / 1.3 / 1.8),
        ariaLabel: "Network showing contiguous countries",
        renderTooltip,
        margin: { top: 40, right: 40, bottom: 40, left: 40 },
        ...rest
      },
      children
    )
);

export default () => (
  <ResponsiveNetwork
    graph={countryGraph}
    networkComponent={NetworkWithCustomizedRenderer}
  />
);
