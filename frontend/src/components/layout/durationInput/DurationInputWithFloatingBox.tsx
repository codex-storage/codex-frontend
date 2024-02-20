import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import DurationInput from './DurationInput';

const FloatingBoxWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #555555;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

interface DurationInputWithFloatingBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onDurationChange: (duration: { days: number; hours: number; minutes: number; seconds: number }) => void;
}

const DurationInputWithFloatingBox: React.FC<DurationInputWithFloatingBoxProps> = ({ isOpen, onClose, onDurationChange }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <FloatingBoxWrapper style={{ display: isOpen ? 'block' : 'none' }} ref={ref}>
      <DurationInput onDurationChange={onDurationChange} />
    </FloatingBoxWrapper>
  );
};

export default DurationInputWithFloatingBox;
