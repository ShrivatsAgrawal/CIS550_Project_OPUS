import styled from 'styled-components'

const Heading = styled.div`
  font-size: 3rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.headingColor};
`

export default Heading
