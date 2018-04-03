import React from 'react';
import { GradientTealBlue, RadialGradient } from '@vx/gradient';
import { Mercator } from '@vx/geo';
import * as topojson from 'topojson-client';
import topology from '../static/world-topo.json';
import meteorStrikes from '../static/meteor-strike-data.json';

export default ({ width, height, events = false }) => {
  if (width < 10) return <div />;

  const world = topojson.feature(topology, topology.objects.units);

//   const meteorData = topojson.feature(meteorStrikes, meteorst)

  console.log(world)

  return (
    <svg width={width} height={height}>
      <RadialGradient
        id="geo_mercator_radial"
        from="#55bdd5"
        to="#4f3681"
        r={'80%'}
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
        fill={() => '#8be4c5'}
        stroke={() => '#5fcfa7'}
        onClick={data => event => {
          if (!events) return;
          alert(`Clicked: ${data.properties.name} (${data.id})`);
        }}
      />
    </svg>
  );
};