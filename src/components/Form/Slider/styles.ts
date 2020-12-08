import styled from 'styled-components';
import ReactSlider from 'react-slider';

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 4px;
`;

export const StyledThumb = styled.div`
  height: 20px;
  line-height: 20px;
  width: 20px;
  top: -8px;
  text-align: center;
  background-color: #fff;
  color: #666;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  cursor: grab;
`;

interface StyledTrackProps {
  index: number;
}

export const StyledTrack = styled.div<StyledTrackProps>`
  top: 0;
  bottom: 0;
  background: ${(props) => (props.index === 1 ? '#C4C4C4' : '#237BC3')};

  border-radius: 999px;
`;
