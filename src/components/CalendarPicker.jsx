import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`;

export default function CalendarPicker({ selectedDate, onChange }) {
  return (
    <Wrapper>
      <Calendar
        value={selectedDate}
        onChange={onChange}
      />
    </Wrapper>
  );
} 