import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./index.css"

function LinkTab(props) {
  return (
    <Tab
      component="a"
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

const SubCategoriesMenu = () => {
    const [value, setValue] = React.useState(0);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleMouseOver = (event, tabNumber) => {
      switch (tabNumber) {
        case 0:
          setAnchorEl1(event.currentTarget);
          break;
        case 1:
          setAnchorEl2(event.currentTarget);
          break;
        case 2:
          setAnchorEl3(event.currentTarget);
          break;
        default:
          break;
      }
    };
  
    const handleCloseMenu = (tabNumber) => {
      switch (tabNumber) {
        case 0:
          setAnchorEl1(null);
          break;
        case 1:
          setAnchorEl2(null);
          break;
        case 2:
          setAnchorEl3(null);
          break;
        default:
          break;
      }
    };
  
    return (
      <Box sx={{ width: '100%', justifyContent:'center', display:{lg:'block',md:'none', sm:'none', xs:'none'}}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          role="navigation"
          className='gehad'
        >
          <LinkTab 
            label="Page One" 
            href="/drafts" 
            onMouseOver={(event) => handleMouseOver(event, 0)} 
          />
          <LinkTab 
            label="Page Two" 
            href="/trash" 
            onMouseOver={(event) => handleMouseOver(event, 1)} 
          />
          <LinkTab 
            label="Page Three" 
            href="/spam" 
            onMouseOver={(event) => handleMouseOver(event, 2)} 
          />
        </Tabs>
        <Menu
          id="basic-menu-1"
          anchorEl={anchorEl1}
          open={Boolean(anchorEl1)}
          onClose={() => handleCloseMenu(0)}
          onMouseLeave={() => handleCloseMenu(0)} // Close on mouse leave
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          getContentAnchorEl={null}
                  transitionDuration={300} // Adjust the transition duration as needed

        >
          <MenuItem>Profile 1</MenuItem>
          <MenuItem>My account 1</MenuItem>
          <MenuItem>Logout 1</MenuItem>
        </Menu>
        <Menu
          id="basic-menu-2"
          anchorEl={anchorEl2}
          open={Boolean(anchorEl2)}
          onClose={() => handleCloseMenu(1)}
          onMouseLeave={() => handleCloseMenu(1)} // Close on mouse leave
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          getContentAnchorEl={null}
          transitionDuration={300} // Adjust the transition duration as needed

        >
          <MenuItem>Profile 2</MenuItem>
          <MenuItem>My account 2</MenuItem>
          <MenuItem>Logout 2</MenuItem>
        </Menu>
        <Menu
          id="basic-menu-3"
          anchorEl={anchorEl3}
          open={Boolean(anchorEl3)}
          onClose={() => handleCloseMenu(2)}
          onMouseLeave={() => handleCloseMenu(2)} // Close on mouse leave
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          getContentAnchorEl={null}
          transitionDuration={300} // Adjust the transition duration as needed

        >
          <MenuItem>Profile 3</MenuItem>
          <MenuItem>My account 3</MenuItem>
          <MenuItem>Logout 3</MenuItem>
        </Menu>
      </Box>
    );
  }

export default SubCategoriesMenu;