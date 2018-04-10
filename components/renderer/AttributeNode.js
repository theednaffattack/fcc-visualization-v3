import React from "react";
import PropTypes from "prop-types";
import { nodeShape } from "@data-ui/network";

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
    margin: 8,
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
  return (
    <g opacity={node.opacity || opacity}>
      <rect
        x={node.size / 2}
        y={node.size / 2}
        width={node.size || defaultSize}
        height={node.size || defaultSize}
        fill={node.fill || fill}
        stroke={node.stroke || stroke}
        strokeWidth={strokeWidth}
        onMouseMove={
          onMouseMove &&
          (event => {
            onMouseMove({
              event,
              index: node.index,
              id: node.id,
              data: node
            });
          })
        }
        onMouseLeave={
          onMouseLeave &&
          (event => {
            onMouseLeave({
              event,
              index: node.index,
              id: node.id,
              data: node
            });
          })
        }
        onMouseEnter={
          onMouseEnter &&
          (event => {
            onMouseEnter({
              event,
              index: node.index,
              id: node.id,
              data: node
            });
          })
        }
        onClick={
          onClick &&
          (event => {
            onClick({
              event,
              index: node.index,
              id: node.id,
              data: node
            });
          })
        }
      />
      {/* put flag here!!! */}
      <text textAnchor="middle" pointerEvents="none" y={2 * node.size}>
        {`${node.country}`}
      </text>
    </g>
  );
}

AttributeNode.propTypes = proptypes;
AttributeNode.defaultProps = defaultProps;
