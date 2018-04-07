import React from "react";
import { GradientTealBlue, RadialGradient } from "@vx/gradient";
import { Mercator } from "@vx/geo";
import { GlyphDot, GlyphCircle } from "@vx/glyph";
import * as topojson from "topojson-client";
import topology from "../static/world-topo.json";
import meteorStrikes from "../static/meteor-strike-data.json";
import * as d3 from "d3";
import { withTooltip, Tooltip } from "@vx/tooltip";

let tooltipTimeout;

export default withTooltip(props => {
  const { width, height, events = false } = props;
  if (width < 10) return <div />;

  const world = topojson.feature(topology, topology.objects.units);

  const projection = d3
    .geoMercator()
    .scale(width / 630 * 100)
    .translate([width / 2, height / 2 + 50]);

  const meteorPoints = meteorStrikes.features.map((feature, i) => (
    <GlyphCircle
      className="dot"
      key={`point-${i}`}
      opacity="0.5"
      fill={"#E91E63"}
      left={
        feature.geometry
          ? `${projection(feature.geometry.coordinates)[0]}`
          : 444
      }
      top={
        feature.geometry
          ? `${projection(feature.geometry.coordinates)[1]}`
          : 444
      }
      size={feature.properties.name == "Paragould" ? 900 : 12}
      onMouseEnter={() => event => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        props.showTooltip({
          tooltipLeft: projection(feature.geometry.coordinates)[0] + 1000,
          tooltipTop: projection(feature.geometry.coordinates)[1] + 20,
          tooltipData: `${feature.properties.name} :: ${
            feature.properties.mass
          } :: ${feature.properties.year}`
        });
      }}
      onTouchStart={() => event => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        props.showTooltip({
          tooltipLeft: projection(feature.geometry.coordinates)[0] + 1000,
          tooltipTop: projection(feature.geometry.coordinates)[1] - 30,
          tooltipData: point
        });
      }}
      onMouseLeave={() => event => {
        tooltipTimeout = setTimeout(() => {
          props.hideTooltip();
        }, 300);
      }}
    />
  ));

  return (
    <div>
      <svg width={width} height={height}>
        <RadialGradient
          id="geo_mercator_radial"
          from="#55bdd5"
          to="#4f3681"
          r={"80%"}
        />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#geo_mercator_radial)`}
          rx={14}
        />
        <Mercator
          data={world.features}
          scale={width / 630 * 100}
          translate={[width / 2, height / 2 + 50]}
          fill={() => "#8be4c5"}
          stroke={() => "#5fcfa7"}
          onClick={data => event => {
            if (!events) return;
            alert(`Clicked: ${data.properties.name} (${data.id})`);
          }}
        />
        {meteorStrikes.features.map((feature, i) => (
          <GlyphCircle
            className="dot"
            key={`point-${i}`}
            opacity="0.5"
            fill={
              feature.properties.mass >= 100000 // "#E91E63"
                ? "#E91E63"
                : feature.properties.mass >= 50000 && // "purple"
                  feature.properties.mass < 100000
                  ? "purple"
                  : feature.properties.mass >= 20000 && // "orange"
                    feature.properties.mass < 50000
                    ? "orange"
                    : feature.properties.mass >= 10000 && // "green"
                      feature.properties.mass < 20000
                      ? "green"
                      : feature.properties.mass >= 2500 && // "yellow"
                        feature.properties.mass < 10000
                        ? "yellow"
                        : feature.properties.mass >= 900 && // "red"
                          feature.properties.mass < 2500
                          ? "red"
                          : 12
            }
            left={
              feature.geometry
                ? `${projection(feature.geometry.coordinates)[0]}`
                : -10
            }
            top={
              feature.geometry
                ? `${projection(feature.geometry.coordinates)[1]}`
                : -10
            }
            size={
              feature.properties.mass >= 100000 // "#E91E63"
                ? 200
                : feature.properties.mass >= 50000 && // "purple"
                  feature.properties.mass < 100000
                  ? 100
                  : feature.properties.mass >= 20000 && // "orange"
                    feature.properties.mass < 50000
                    ? 75
                    : feature.properties.mass >= 10000 && // "green"
                      feature.properties.mass < 20000
                      ? 50
                      : feature.properties.mass >= 2500 && // "yellow"
                        feature.properties.mass < 10000
                        ? 25
                        : feature.properties.mass >= 900 && // "red"
                          feature.properties.mass < 2500
                          ? 18
                          : 12
            }
            onMouseEnter={() => event => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout);
              props.showTooltip({
                tooltipLeft: projection(feature.geometry.coordinates)[0] + 450,
                tooltipTop: projection(feature.geometry.coordinates)[1] + 20,
                tooltipData: {
                  name: feature.properties.name,
                  mass: feature.properties.mass,
                  year: feature.properties.year.substring(0, 4)
                }
              });
            }}
            onTouchStart={() => event => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout);
              props.showTooltip({
                tooltipLeft: projection(feature.geometry.coordinates)[0] + 450,
                tooltipTop: projection(feature.geometry.coordinates)[1] - 30,
                tooltipData: {
                  name: feature.properties.name,
                  mass: feature.properties.mass,
                  year: feature.properties.year.substring(0, 4)
                }
              });
            }}
            onMouseLeave={() => event => {
              tooltipTimeout = setTimeout(() => {
                props.hideTooltip();
              }, 300);
            }}
          />
        ))}
      </svg>
      {props.tooltipOpen && (
        <Tooltip left={props.tooltipLeft} top={props.tooltipTop}>
          <div>
            <strong>name:</strong> {props.tooltipData["name"]}
          </div>
          <div>
            <strong>mass:</strong> {props.tooltipData["mass"]}
          </div>
          <div>
            <strong>year:</strong> {props.tooltipData["year"]}
          </div>
        </Tooltip>
      )}
    </div>
  );
});
