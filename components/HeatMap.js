import React from "react";
import { Group } from "@vx/group";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { genBins } from "@vx/mock-data";
import { scaleBand, scaleLinear, scaleTime } from "@vx/scale";
import { HeatmapCircle, HeatmapRect } from "@vx/heatmap";
import { extent, min, max } from "d3-array";

const data = genBins(16, 16);

console.log(data);

// accessors
const x = d => d.bin;
const y = d => d.bins;
const z = d => d.count;

export default ({
  width,
  height,
  events = true,
  margin = {
    top: 10,
    left: 50,
    right: 45,
    bottom: 20
  }
}) => {
  if (width < 10) return null;

  // bounds
  const size =
    width > margin.left + margin.right
      ? width - margin.left - margin.right
      : width;
  const xMax = size - margin.right;
  const yMax = height - margin.bottom;
  const dMin = min(data, d => min(y(d), x));
  const dMax = max(data, d => max(y(d), x));
  const dStep = dMax / data[0].bins.length;
  const bWidth = xMax / data.length;
  const bHeight = yMax / data[0].bins.length;
  const colorMax = max(data, d => max(y(d), z));

  // scales
  const xScale = scaleLinear({
    range: [0, xMax],
    domain: extent(data, x)
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [dMin, dMax]
  });
  const colorScale = scaleLinear({
    range: ["#77312f", "#f33d15"],
    domain: [0, colorMax]
  });
  const colorScale2 = scaleLinear({
    range: ["#122549", "#b4fbde"],
    domain: [0, colorMax]
  });
  const opacityScale = scaleLinear({
    range: [0.1, 1],
    domain: [0, colorMax]
  });

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill="#28272c" />

      {/* <WithTooltip
    renderTooltip={({ event, datum, color }) => (
      <div>
        <StyledXH3>${datum.y}</StyledXH3>
        <StyledP>{formattedDate(datum.x)}</StyledP>
      </div>
    )}
    tooltipProps={{
      offsetTop: 0,
      style: {
        // color: "blue",
        backgroundColor: "goldenrod",
        opacity: 0.9
      }
    }}
  > */}
      <Group top={margin.top} left={margin.left}>
        <HeatmapRect
          data={data}
          xScale={xScale}
          yScale={yScale}
          colorScale={colorScale2}
          opacityScale={opacityScale}
          binWidth={bWidth}
          binHeight={bWidth}
          step={dStep}
          gap={0}
          onClick={data => event => {
            if (!events) return;
            alert(`clicked: ${JSON.stringify(data.bin)}`);
          }}
        />
      </Group>
      {/* </WithTooltip> */}
    </svg>
  );
};
