import React from "react";
import { GradientTealBlue, RadialGradient } from "@vx/gradient";
import { Mercator } from "@vx/geo";
import { GlyphDot, GlyphCircle } from "@vx/glyph";
import * as topojson from "topojson-client";
import topology from "../static/world-topo.json";
import meteorStrikes from "../static/meteor-strike-data.json";
import * as d3 from "d3";

{
  /* <circle
key={ `marker-${i}` }
cx={ feature.geometry ? `${projection(feature.geometry.coordinates)[0]}` : 444 }
cy={ feature.geometry ? `${projection(feature.geometry.coordinates)[1]}` : 333 }
r={ 8 } // feature.properties.mass  / 630 * 100 / 10000
fill="#E91E63"
opacity="0.5"
stroke="#FFFFFF"
className="marker" 
/> */
}

export default ({ width, height, events = false }) => {
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
      size={i % 3 === 0 ? 50 : 12}
      onMouseEnter={() => event => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        props.showTooltip({
          tooltipLeft: projection(feature.geometry.coordinates)[0],
          tooltipTop: projection(feature.geometry.coordinates)[1] + 20,
          tooltipData: point
        });
      }}
      onTouchStart={() => event => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        props.showTooltip({
          tooltipLeft: projection(feature.geometry.coordinates)[0],
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
      {meteorPoints}
    </svg>
  );
};
