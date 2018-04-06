import React from 'react';
import { GradientTealBlue, RadialGradient } from '@vx/gradient';
import { Mercator } from '@vx/geo';
import { GlyphDot } from '@vx/glyph';
import * as topojson from 'topojson-client';
import topology from '../static/world-topo.json';
import meteorStrikes from '../static/meteor-strike-data.json';
// import Projection from 'd3-geo-projection' 
// import projection from 'd3-geo'
import * as d3 from 'd3'

const scaleMe = function (someArg, privateWidth) {
    let multiplier = null
    // let privateWidth = null
    someArg ? multiplier = someArg : multiplier = 1
    return (privateWidth / 630 * 100) * multiplier
}

var projection = d3.geoMercator()
.scale(900 / 630 * 100)
.translate([900 / 2, 600 / 2 + 50]);

// var projection = d3.geo.mercator()
//   .translate([780,360])
//   .scale(300);
//     .attr('cx', function(d) { return projection([d.properties.reclong,d.properties.reclat])[0] })
//     .attr('cy', function(d) { return projection([d.properties.reclong,d.properties.reclat])[1] })

// const projection = 

export default ({ width, height, events = false }) => {
  if (width < 10) return <div />;

  const world = topojson.feature(topology, topology.objects.units);

//   const meteorData = topojson.feature(meteorStrikes, meteorst)
// meteorStrikes.features["0"].geometry.coordinates
//   console.log("meteorStrikes")
//   console.log(meteorStrikes.features["0"])

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

           {  
            meteorStrikes.features.map((feature, i) => (
                console.log("feature.geometry"),
                console.log(feature.geometry ? `${projection(feature.geometry.coordinates)},\nmass = ${feature.properties.mass}`: null),
              <circle
                key={ `marker-${i}` }
                cx={ feature.geometry ? function (feature) { return projection(feature.geometry.coordinates)[0]; } : 1 }
                cy={ feature.geometry ? function (feature) { return projection(feature.geometry.coordinates)[1]; } : 2  }
                
                r={ 8 } // feature.properties.mass  / 630 * 100 / 10000
                fill="#E91E63"
                stroke="#FFFFFF"
                className="marker" 
              />
            ))
          }
      
    </svg>
  );
};