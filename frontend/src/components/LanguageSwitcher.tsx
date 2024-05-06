// LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      labelId="language-select-label"
      id="language-select"
      value={i18n.language || 'en'}
      onChange={handleChange}
      displayEmpty
      sx={{
        color: 'white',
        '.MuiSvgIcon-root': { color: 'white' },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '0.9rem',
      }}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="fi">Suomi (Finnish)</MenuItem>
      <MenuItem value="ru">Русский (Russian)</MenuItem>
      <MenuItem value="vi">Tiếng Việt (Vietnamese)</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
