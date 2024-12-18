import React from 'react';
import { ReactComponent as WorldSVG } from '../../assets/icons/main/world.svg';
import styled from 'styled-components';

interface WorldMapProps {
  svgRef: React.RefObject<SVGSVGElement>;
  transform: string;
  hoveredCountry: string | null;
  tooltipPosition: {
    x: number;
    y: number;
  } | null;
}

export default function WorldMap({
  svgRef,
  transform,
  hoveredCountry,
  tooltipPosition
}: WorldMapProps) {
  return (
    <span>
      <StyledWorldSVG ref={svgRef} style={{ transform }} />
      {hoveredCountry && tooltipPosition && (
        <Tooltip
          style={{ top: tooltipPosition.y - 1, left: tooltipPosition.x }}
        >
          {hoveredCountry}
        </Tooltip>
      )}
    </span>
  );
}

const StyledWorldSVG = styled(WorldSVG)`
  position: absolute;
  transform-origin: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  clip-path: inset(0);
  width: 100%;
  height: 100%;
  padding: 3rem;
  transform-origin: center;
  transition: transform 0.3s ease;
  will-change: transform, transition;

  .country {
    stroke: #ffffff;
    stroke-width: 0.5;

    &:hover {
      fill: rgba(178, 31, 124, 0.5);
      cursor: pointer;
    }

    transition: fill 0.3s ease;
  }

  @media screen and (mim-width: 1024px) {
    display: none;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0.25rem;
  pointer-events: none;
  white-space: nowrap;
  font-size: 0.75rem;
  transform: translate(-50%, -100%);

  @media screen and (mim-width: 1024px) {
    display: none;
  }
`;
