import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { on } from 'events';

export function DropDownComponent({title, menuItems, onChange}) {
  const [age, setAge] = React.useState(menuItems[0]);

  const handleChange = (event) => {
    setAge(event.target.value);
    onChange(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 130 } }>
      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label={title}
          onChange={handleChange}
        >
          {menuItems?.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}