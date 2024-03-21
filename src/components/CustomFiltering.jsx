import React,{useState} from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, Slider } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
// import { Calendar } from 'react-date-range';
import DateRangePickerComponent from './DateRangePickerComponent';
import CustomGroupingDropDown from './CustomGroupingDropDown';
import data from '../data/sample.json'
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function CustomFiltering({setColumnFilters,table}) {
  const theme = useTheme();
    const [Name, setName] = useState("");
    const [personName,setPersonName] = useState([])
    const [personNam,setPersonNam] = useState([])
    const [date, setDate] = useState("")
    const [activate,setActivate] = useState(false);
    const handleChang = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const handleChan = (event) => {
      const {
        target: { value },
      } = event;
      setPersonNam(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    const [value, setValue] = useState([11, 200]);
    const [val,setval]=useState([10, 170]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChange1 = (event, newValue) => {
      setval(newValue);
    };
    const [selectedRange, setSelectedRange] = useState({
      startDate: new Date(),
      endDate: new Date()
  });
  const [upselectedRange, setUpSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date()
});
  const handleDateRangeChange = (range) => {
      setSelectedRange(range);
   
  };
  const handleDateRangeChange1 = (range) => {
    setUpSelectedRange(range);
 
};
    const handleRefresh = () => {
      setValue([11, 200]);
    };
 console.log(selectedRange);
    const handleSetFilters = ()=>{
   
 console.log(selectedRange);
      setColumnFilters([{id:'name',"value":Name},{id:'price',"value":value},{id:'createdAt',"value":[selectedRange.startDate,selectedRange.endDate]},{id:"category",value:personName}]);
    }

  const category = []
  data.forEach(data => {
    category.push(data.category);
});
const subcategory = []
  data.forEach(data => {
    subcategory.push(data.subcategory);
});
   return (
    <div style={{padding:"10px",display:"flex",flexDirection:"column",gap:'10px'}}>
      <Box border={1}  p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography fontSize="16px" fontWeight={700} component="div" flexGrow={1}>
          Name
        </Typography>
        <IconButton onClick={()=>setName("")}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <TextField
       
        label="Enter text"
        value={Name}
        sx={{width:"600px !important"}}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        margin="normal"
      />
    </Box>
    <Box border={1}  p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography fontSize="16px" fontWeight={700} component="div" flexGrow={1}>
          Category
        </Typography>
        <IconButton onClick={()=>setPersonName([])}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <FormControl sx={{  width: 600 }}>
        <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChang}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {category.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
              selected={personName.includes(name)?true:false}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
    </Box>
    <Box border={1}  p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography fontSize="16px" fontWeight={700} component="div" flexGrow={1}>
         Sub Category
        </Typography>
        <IconButton onClick={()=>setPersonNam([])}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <FormControl sx={{  width: 600 }}>
        <InputLabel id="demo-multiple-chip-label">Sub Category</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personNam}
           onChange={handleChan}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {subcategory.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personNam, theme)}
              selected={personNam.includes(name)?true:false}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
    </Box>
    <Box border={1} p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" component="div" flexGrow={1} onClick={()=>setActivate(!activate)}>
          {date?date:"Created At"}
        </Typography>
       
        <IconButton onClick={()=>{}}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <DateRangePickerComponent onChange={handleDateRangeChange} />
      {/* <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={createdDateRange}
        onChange={(newDateRange) => setCreatedDateRange(newDateRange)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} variant="outlined" />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} variant="outlined" />
          </>
        )}
      /> */}
    </Box>
    <Box border={1} p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" component="div" flexGrow={1} onClick={()=>setActivate(!activate)}>
          {date?date:"Updated At"}
        </Typography>
       
        <IconButton onClick={()=>{}}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <DateRangePickerComponent onChange={handleDateRangeChange1} />
      {/* <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={createdDateRange}
        onChange={(newDateRange) => setCreatedDateRange(newDateRange)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} variant="outlined" />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} variant="outlined" />
          </>
        )}
      /> */}
    </Box>
    <Box border={1}  p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography fontSize="16px" fontWeight={700} component="div" flexGrow={1}>
          Price
        </Typography>
        <IconButton onClick={()=>setValue([11,200])}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={11}
        max={200}
        step={1}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        orientation="horizontal"
        style={{ width: 600 }}
      />
      
    </Box>
    <Box border={1}  p={2} borderRadius={2}>
      <Box display="flex" alignItems="center">
        <Typography fontSize="16px" fontWeight={700} component="div" flexGrow={1}>
          Sales Price
        </Typography>
        <IconButton onClick={()=>setval([10,170])}>
          <RefreshIcon />
        </IconButton>
      </Box>
      <Slider
        value={val}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        min={10}
        max={170}
        step={1}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        orientation="horizontal"
        style={{ width: 600 }}
      />
      
    </Box>
    <Button variant="contained" color='info' onClick={()=>{
      setName("");
      setPersonName([]);
      setPersonNam([]);
      setValue([11, 200]);
      setval([10, 170]);
      setSelectedRange({
        startDate: new Date(),
        endDate: new Date()
    });
    setUpSelectedRange({
      startDate: new Date(),
      endDate: new Date()
  });
    }}>Clear Filters</Button>
    <Button variant="contained" onClick={()=>handleSetFilters()}>Apply Filters</Button>
    </div>
  )
}

export default CustomFiltering