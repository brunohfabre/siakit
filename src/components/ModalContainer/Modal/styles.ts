import styled, { css } from 'styled-components';

interface ContainerProps {
  visible: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.565);
  color: rgb(255, 255, 255);
  cursor: pointer;
  z-index: 9998;
  font-size: 16px;
  transition: all 0.3s ease 0s;
  opacity: 0;
  visibility: hidden;

  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

interface ModalContentProps {
  visible: boolean;
}

export const ModalContent = styled.div<ModalContentProps>`
  position: relative;
  width: 100%;
  max-width: 768px;
  max-height: 90vh;
  padding: 33px;
  background: #fff;
  /* box-shadow: rgba(0, 0, 0, 0.565) 0px 5px 30px; */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 4px rgba(0, 0, 0, 0.05);

  opacity: 0;
  border-radius: 5px;
  overflow-y: auto;
  text-align: left;
  cursor: default;
  transform: translateY(20px);
  transition: transform 0.2s ease-in 0s, opacity 0.2s ease-in 0s;

  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      transform: translateY(0px);
      transition: transform 0.3s ease-out 0.2s, opacity 0.3s ease-out 0.2s;
    `}
`;
