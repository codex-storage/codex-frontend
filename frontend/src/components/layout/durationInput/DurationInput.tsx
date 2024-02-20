import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const DurationInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 50px;
  margin: 0 5px;
  text-align: center;
`;

interface DurationInputProps {
  onDurationChange: (duration: { days: number; hours: number; minutes: number; seconds: number }) => void;
}

const DurationInput: React.FC<DurationInputProps> = ({ onDurationChange }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const durationInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (durationInputRef.current && !durationInputRef.current.contains(event.target as Node)) {
        onDurationChange({ days, hours, minutes, seconds });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onDurationChange, days, hours, minutes, seconds]);

  const handleDurationChange = () => {
    onDurationChange({ days, hours, minutes, seconds });
  };

  return (
    <DurationInputWrapper ref={durationInputRef}>
      <Input
        type="number"
        value={days}
        onChange={(e) => setDays(parseInt(e.target.value))}
        placeholder="Days"
        onBlur={handleDurationChange}
      />
      <span>days</span>
      <Input
        type="number"
        value={hours}
        onChange={(e) => setHours(parseInt(e.target.value))}
        placeholder="Hours"
        onBlur={handleDurationChange}
      />
      <span>hours</span>
      <Input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(parseInt(e.target.value))}
        placeholder="Minutes"
        onBlur={handleDurationChange}
      />
      <span>minutes</span>
      <Input
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(parseInt(e.target.value))}
        placeholder="Seconds"
        onBlur={handleDurationChange}
      />
      <span>seconds</span>
    </DurationInputWrapper>
  );
};

export default DurationInput;
