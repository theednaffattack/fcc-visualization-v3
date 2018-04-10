import React from "react";
import PropTypes from "prop-types";
import { nodeShape } from "@data-ui/network";
import { getRandomID } from "../data";

const proptypes = {
  nodeStyles: PropTypes.object,
  node: nodeShape.isRequired,
  onMouseMove: PropTypes.func,
  onClick: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func
};

const defaultProps = {
  nodeStyles: {
    fill: "#15aabf",
    stroke: "none",
    strokeWidth: 0,
    opacity: 0.5,
    defaultSize: 3
  },
  onMouseMove: null,
  onClick: null,
  onMouseLeave: null,
  onMouseEnter: null
};

export default function AttributeNode(props) {
  const {
    nodeStyles,
    node,
    onMouseMove,
    onClick,
    onMouseLeave,
    onMouseEnter
  } = props;
  const { stroke, strokeWidth, fill, opacity, defaultSize } = nodeStyles;
  const nodeVals = {
    x: 100,
    y: 200,
    id: getRandomID(),
    size: 10,
    opacity: 1,
    fill: "#e03131",
    label: node.country,
    type: "Attr"
  };
  // console.log("from attribute node renderer");
  // console.log(node);
  return (
    <g opacity={nodeVals.opacity || opacity}>
      <rect
        x={-nodeVals.size / 2}
        y={-nodeVals.size / 2}
        width={nodeVals.size || defaultSize}
        height={nodeVals.size || defaultSize}
        fill={nodeVals.fill || fill}
        stroke={nodeVals.stroke || stroke}
        strokeWidth={strokeWidth}
        onMouseMove={
          onMouseMove &&
          (event => {
            onMouseMove({
              event,
              index: nodeVals.index,
              id: nodeVals.id,
              data: nodeVals
            });
          })
        }
        onMouseLeave={
          onMouseLeave &&
          (event => {
            onMouseLeave({
              event,
              index: nodeVals.index,
              id: nodeVals.id,
              data: nodeVals
            });
          })
        }
        onMouseEnter={
          onMouseEnter &&
          (event => {
            onMouseEnter({
              event,
              index: nodeVals.index,
              id: nodeVals.id,
              data: nodeVals
            });
          })
        }
        onClick={
          onClick &&
          (event => {
            onClick({
              event,
              index: nodeVals.index,
              id: nodeVals.id,
              data: nodeVals
            });
          })
        }
      />
      <text textAnchor="middle" pointerEvents="none" y={2 * nodeVals.size}>
        {`${nodeVals.label}`}
      </text>
    </g>
  );
}

AttributeNode.propTypes = proptypes;
AttributeNode.defaultProps = defaultProps;
