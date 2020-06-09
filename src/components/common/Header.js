import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = { color: '#F15B2A' };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <NavLink className="nav-brand" to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/malts" activeStyle={activeStyle}>
            Malts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/malttypes"
            activeStyle={activeStyle}
          >
            MaltTypes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/hops" activeStyle={activeStyle}>
            Hops
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/hoptypes"
            activeStyle={activeStyle}
          >
            HopTypes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/yeasts" activeStyle={activeStyle}>
            Yeasts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/yeasttypes"
            activeStyle={activeStyle}
          >
            YeastTypes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/equipments"
            activeStyle={activeStyle}
          >
            Equipments
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/equipmenttypes"
            activeStyle={activeStyle}
          >
            EquipmentTypes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
