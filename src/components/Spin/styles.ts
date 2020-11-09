import styled, { css, keyframes } from 'styled-components';

const animation = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

interface ContainerProps {
  isFloating?: boolean;
}

interface ContentProps {
  color: string;
}

export const Container = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isFloating &&
    css`
      position: absolute;
      background: rgba(255, 255, 255, 0.75);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
`;

export const Content = styled.div<ContentProps>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  animation: ${animation} 0.9s linear infinite;

  ${(props) =>
    props.color === 'dark' &&
    css`
      border: 2px solid rgba(0, 0, 0, 0.16);
      border-left-color: #333;
    `}

  ${(props) =>
    props.color === 'light' &&
    css`
      border: 2px solid rgba(255, 255, 255, 0.24);
      border-left-color: #fff;
    `}
`;
