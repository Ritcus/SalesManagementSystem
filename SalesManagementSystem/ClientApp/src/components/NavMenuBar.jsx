import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import Logo from '../img/Logo.png'

export default class NavMenuBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
      <Menu inverted color="blue" stackable>
        <Menu.Item as={NavLink} to="/">
        
          <img src={Logo} />
        </Menu.Item>

        <Menu.Item
        as={NavLink} to="/"
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
        as={NavLink} to="/customer"
          name='customer'
          active={activeItem === 'customer'}
          onClick={this.handleItemClick}
        >
          Customer
        </Menu.Item>

        <Menu.Item
        as={NavLink} to="/product"
          name='product'
          active={activeItem === 'product'}
          onClick={this.handleItemClick}
        >
          Product
        </Menu.Item>
        <Menu.Item
        as={NavLink} to="/store"
          name='store'
          active={activeItem === 'store'}
          onClick={this.handleItemClick}
        >
          Stores
        </Menu.Item>
        <Menu.Item
        as={NavLink} to="/sales"
          name='sales'
          active={activeItem === 'sales'}
          onClick={this.handleItemClick}
        >
          Sales
        </Menu.Item>
      </Menu>
      </Segment>
    )
  }
}