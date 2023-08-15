import './App.css';
import { useState } from 'react';
import usePasswordGenerator from './hooks/use-password-generator';
import PasswordStrengthChecker from './components/StrengthChecker';
import Button from './components/Button';
import Checkbox from './components/Checkbox';

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    {title: 'Include Uppercase Letters', state: false},
    {title: 'Include Lowercase Letters', state: false},
    {title: 'Include Numbers', state: false},
    {title: 'Include Symbols', state: false}
  ]);

  const [copied, setCopied] =  useState(false);

  const handleCheckbox = (i) => {
     const updatedCheckboxData = [...checkboxData];
     updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
     setCheckboxData(updatedCheckboxData);
  };

   const {password, errorMessage, generatePassword} =  usePasswordGenerator();

   const handleCopyBtn = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
   }
  return (
    <div className= "container">
    {password && <div className="header">
      <div className= "title">{password}</div>
      <Button text={copied ? "Copied" : "Copy"} onClick={handleCopyBtn} customClass="copyBtn" />
    </div>
    }
    <div className="charlength">
      <span>
        <label>Character Length</label>
        <label>{length}</label>
      </span>
      <input type='range' min="4" max="20" onChange={(e) => setLength(e.target.value)} />
    </div>
    <div className="checkboxes">
      {checkboxData.map((checkbox, index) => {
        return <Checkbox title={checkbox.title} onChange={() => handleCheckbox(index)} checked={checkbox.state} />
      })}
    </div>
    <PasswordStrengthChecker password={password}/>
    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    <Button text="Generate Password" onClick={() => generatePassword(checkboxData, length)} customClass="generateBtn" />
    </div>
  );
}

export default App;
