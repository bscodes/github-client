import { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import useColorTheme from '@/utils/hooks/useColorTheme';

export default function Switcher() {
  const [colorTheme, setTheme] = useColorTheme();
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={30} />
    </>
  );
}
