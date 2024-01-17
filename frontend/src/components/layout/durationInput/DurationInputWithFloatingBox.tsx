// DurationInputWithFloatingBox.tsx
import React, { useState } from 'react';
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
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  flex: 1;
`;

interface DurationInputWithFloatingBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onDurationChange: (duration: { days: number; hours: number; minutes: number; seconds: number }) => void;
}

const DurationInputWithFloatingBox: React.FC<DurationInputWithFloatingBoxProps> = ({ isOpen, onClose, onDurationChange }) => {
  return (
    <FloatingBoxWrapper style={{ display: isOpen ? 'flex' : 'none' }}>
      <DurationInput onDurationChange={onDurationChange} />
      <CloseButton onClick={onClose}>Close</CloseButton>
    </FloatingBoxWrapper>
  );
};

export default DurationInputWithFloatingBox;
