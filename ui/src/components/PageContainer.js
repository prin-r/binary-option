import { Box } from 'rebass'
import styled from 'styled-components'

const PageContainer = styled(Box)`
  margin: 0 auto;
  flex: 1;
  width: 90%;
  ${p => p.bg && `background: ${p.bg};`}

  max-width: 1440px;
`

export default PageContainer
