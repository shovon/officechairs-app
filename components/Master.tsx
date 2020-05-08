import styled from "styled-components";

const MasterDiv = styled.div`
  padding: 20px;
  max-width: 1400;
  margin: 0 auto;
`;

export default function Master({ children }) {
  return <MasterDiv>{children}</MasterDiv>;
}
