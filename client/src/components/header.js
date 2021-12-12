import React from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'
import Icon from './icon'

const links = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Job Search',
    href: '/search/jobs/',
  },
]

const Container = styled.div`
  max-width: 100vw;
  height: 17vh;
  margin: 0 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease-out;
  @media only screen and (max-width: 768px) {
    margin: 0 2rem;
  }
`

const Links = styled.ul`
  list-style-type: none;
  margin: 0;
  cursor: default;
  text-align: center;
  font-size: 2.0rem;
  align-items: center;
`

const LinksItem = styled.li`
  padding: 0;
  margin: 0;
  display: inline-block;
  margin-left: 25px;
  cursor: pointer;
  align-items: center;
  color: ${props => props.theme.colors.textColor};
  user-select: none;
  font-size: 1.2rem;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.7;
  }
`
const SubLinksItem = styled.li`
  padding: 0;
  margin: 0;
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
  align-items: center;
  color: ${props => props.theme.colors.textColor};
  user-select: none;
  font-size: 0.9rem;
  transition: all 0.3s ease-out;
  &:hover {
    opacity: 0.7;
  }
`
const Divider = styled.li`
  padding: 0;
  margin: 0;
  display: inline-block;
  margin-left: 20px;
  align-items: center;
  color: ${props => props.theme.colors.textColor};
  user-select: none;
  font-size: 1.0rem;
`
function RenderHeader(props){
  const symbol = props.symbol;
  if (symbol){
    return (
      <Container>
        <Icon isDark={props.isDark} setIsDark={props.setIsDark} />
        <Links>
          OPUS
          {links.map(link => (
            <LinksItem key={link.href}>
              <NavLink
                style={{ color: 'inherit', textDecoration: 'none' }}
                to={link.href}
              >
                {link.title}
              </NavLink>
            </LinksItem>
          ))}
          <Divider>
            {symbol}:
          </Divider>
          <SubLinksItem key={`/company/info/${symbol}`} >
              <NavLink
                style={{ color: 'inherit', textDecoration: 'none' }}
                to={`/company/info/${symbol}`}
              >
                Information
              </NavLink>
          </SubLinksItem>
          <SubLinksItem key={`/company/sentiment/${symbol}`} >
              <NavLink
                style={{ color: 'inherit', textDecoration: 'none' }}
                to={`/company/sentiment/${symbol}`}
              >
                Sentiments
              </NavLink>
          </SubLinksItem>
          <SubLinksItem key={`/company/news/${symbol}`} >
              <NavLink
                style={{ color: 'inherit', textDecoration: 'none' }}
                to={`/company/news/${symbol}`}
              >
                News
              </NavLink>
          </SubLinksItem>
          <SubLinksItem key={`/company/jobs/${symbol}`} >
              <NavLink
                style={{ color: 'inherit', textDecoration: 'none' }}
                to={`/company/jobs/${symbol}`}
              >
                Jobs
              </NavLink>
          </SubLinksItem>
        </Links>
      </Container>
    )
  }
  return (
    <Container>
      <Icon isDark={props.isDark} setIsDark={props.setIsDark} />
      <Links>
        OPUS
        {links.map(link => (
          <LinksItem key={link.href}>
            <NavLink
              style={{ color: 'inherit', textDecoration: 'none' }}
              to={link.href}
            >
              {link.title}
            </NavLink>
          </LinksItem>
        ))}
      </Links>
    </Container>
  )
  }

const Header = ({ isDark, setIsDark, symbol }) => (
  <RenderHeader isDark={isDark} setIsDark={setIsDark} symbol={symbol} />
)

export default Header
