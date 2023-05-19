import styled, { keyframes } from "styled-components"

type Inherit = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
const spin = keyframes`
  0% {
    border-color: #65ffce;
    border-top-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(0deg) scale(1);
  }

  20% {
    border-color: #72ff85;
    border-top-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(180deg) scale(0.7);
    -webkit-transform: rotate(180deg) scale(0.7);
    -moz-transform: rotate(180deg) scale(0.7);
    -ms-transform: rotate(180deg) scale(0.7);
    -o-transform: rotate(180deg) scale(0.7);
  }

  40% {
    border-color: #fada23;
    border-top-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(360deg) scale(1);
  }

  60% {
    border-color: #ff7648;
    border-top-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(540deg) scale(0.8);
  }

  80% {
    border-color: #c260ff;
    border-top-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(360deg) scale(1.1);
  }

  100% {
    border-color: #53a3ff;
    border-top-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(0deg) scale(1);
  }
`
const Spinner = styled.div`
  border-radius: 50%;
  border-style: solid;
  border-width: 8px;
  border-color: #65ffce;
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: ${spin} 3s infinite;
  transition-duration: 700ms;
  user-select: none;
`

export const ColorfulSpinner = ({
  style,
  size,
}: Inherit & {
  size: number
}) => {
  return (
    <Spinner
      style={{ width: `${size}px`, height: `${size}px`, ...(style ?? {}) }}
    />
  )
}
