import React from "react";
import { GradientTealBlue, RadialGradient } from "@vx/gradient";
import { Mercator } from "@vx/geo";
import { genRandomNormalPoints } from "@vx/mock-data";
import { GlyphCircle } from "@vx/glyph";
import * as topojson from "topojson-client";
import topology from "../static/world-topo.json";
import meteorStrikes from "../static/meteor-strike-data.json";

const points = genRandomNormalPoints(600).filter((d, i) => {
  return i < 600;
});

export default ({ width, height, events = false }) => {
  if (width < 10) return <div />;

  const world = topojson.feature(topology, topology.objects.units);

  // const meteorData = topojson.feature(meteorStrikes, meteorStrikes.foo);

  console.log(JSON.stringify(meteorStrikes, null, 2));
  // console.log(JSON.stringify(topology, null, 2));

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
    </svg>
  );
};
