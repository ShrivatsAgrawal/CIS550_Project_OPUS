import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import Header from './header'

import lightTheme from '../themes/light'
import darkTheme from '../themes/dark'

import './styles/normalize.css'
import './styles/fonts.css'
import './styles/global.css'
import { symbol } from 'shards-react'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textColor};
    transition: all 0.5s ease-out;
  }
`

const Content = styled.div`
  margin: 0 10rem;
  color: ${props => props.theme.colors.textColor};  
  @media only screen and (max-width: 768px) {
    margin: 0 2rem;
  }
`

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(false)
  const symbol = children.props.children[0].props.symbol ? children.props.children[0].props.symbol : null

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Header isDark={isDark} setIsDark={setIsDark} symbol={symbol} />
      <GlobalStyle />
      <Content>{children}</Content>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
