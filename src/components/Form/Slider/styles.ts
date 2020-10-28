import styled from 'styled-components';
import ReactSlider from 'react-slider';

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`;

export const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #000;
  color: #fff;
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
