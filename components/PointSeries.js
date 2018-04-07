import styled from "styled-components";
import {
  XYChart,
  CrossHair,
  XAxis,
  YAxis,
  AreaSeries,
  BarSeries,
  CirclePackSeries,
  GroupedBarSeries,
  IntervalSeries,
  LineSeries,
  PointSeries,
  StackedBarSeries,
  BoxPlotSeries,
  ViolinPlotSeries,
  HorizontalReferenceLine,
  PatternLines,
  LinearGradient,
  WithTooltip
} from "@data-ui/xy-chart";
import ResponsiveXYChart, {
  dateFormatter,
  formatYear
} from "./ResponsiveXYChart";
import colors from "@data-ui/theme/build/color";
import {
  // circlePackData,
  timeSeriesData,
  formattedDate,
  bicycleTimingData
  // categoricalData,
  // groupKeys,
  // stackedData,
  // groupedData,
  // pointData,
  // intervalLineData,
  // intervalData,
  // temperatureBands,
  // priceBandData,
} from "../data";

const StyledXH3 = styled.h3`
  font-weight: bold;
  margin-top: 6px;
  margin-bottom: 6px;
  padding-bottom: 1px;
`;

const StyledP = styled.p`
  margin-top: 6px;
  margin-bottom: 6px;
  padding-bottom: 1px;
`;

const renderTooltipFunc = ({ event, datum, data, color }) => (
  <div>
    <div>
      <strong>x </strong>
      {formattedDate(datum.x)}
    </div>
    <div>
      <strong>y </strong>
      {datum.y}
    </div>
  </div>
);

export default props => (
  <WithTooltip
    renderTooltip={({ event, datum, color }) => (
      <div style={{ textAlign: "left" }}>
        <StyledXH3>{datum.y}</StyledXH3>
        <StyledP>{bicycleTimingData(datum.x)}</StyledP>
        <StyledP>{datum.name}</StyledP>
        <StyledP>{datum.nationality}</StyledP>
        {datum.allegation ? (
          <StyledP>
            {" "}
            <a href={datum.url}>{datum.allegation}</a>
          </StyledP>
        ) : (
          <StyledP>He's clean!!!</StyledP>
        )}
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
  >
    <ResponsiveXYChart
      ariaLabel="Required label"
      xScale={
        (console.log(new Date(Math.min(...props.data.map(obj => obj.x)))),
        {
          type: "linear",
          range: [props.width - 127, 0],
          domain: [
            new Date(Math.min(...props.data.map(obj => obj.x))),
            new Date(Math.max(...props.data.map(obj => obj.x)))
          ]
        })
      }
      yScale={{
        type: "linear",
        range: [0, props.height - 127],
        domain: [0, 35]
      }}
      width={props.width}
      height={props.height}
      renderTooltip={null}
    >
      <PatternLines
        id="lines"
        height={8}
        width={8}
        stroke={colors.categories[3]}
        strokeWidth={1.5}
        orientation={["diagonal"]}
      />
      <LinearGradient id="gradient" from={colors.light} to={colors.default} />
      <YAxis
        label="Gross Domestic Product, USA"
        numTicks={8}
        orientation="left"
      />
      <PointSeries
        data={props.data.map((d, i) => ({
          ...d,
          fill: `url(#${d.allegation.length < 1 ? "lines" : "gradient"})`,
          size: 10
        }))}
        fill="url(#aqua_lightaqua_gradient)"
      />

      <XAxis tickFormat={formatYear} numTicks={timeSeriesData.length - 2} />
    </ResponsiveXYChart>
  </WithTooltip>
);
