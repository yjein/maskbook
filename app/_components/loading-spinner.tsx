// spinner.tsx
import styled, { keyframes } from 'styled-components';

/* === keyframes === */
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

/* === visually-hidden helper === */
export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

/* === loader === */
interface SpinnerProps {
  size?: string;
  color?: string;
}

export const Spinner = styled.div<SpinnerProps>`
  display: inline-block;
  width: 8px;
  height: 8px;
  color: ${({ color }) => color || '#f97316'}; /* text-orange-500 */
  border: 4px solid currentColor;
  border-right-color: transparent;
  border-radius: 9999px;            /* rounded-full */
  vertical-align: -0.125em;         /* align-[-0.125em] */
  animation: ${spin} 1.5s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;