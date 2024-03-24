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
            value={i18n.language}
            onChange={handleChange}
            displayEmpty
        >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fi">Suomi (Finnish)</MenuItem>
            <MenuItem value="ru">Русский (Russian)</MenuItem>
        </Select>
    );
};

export default LanguageSwitcher;
