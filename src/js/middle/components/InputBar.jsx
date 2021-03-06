import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

function InputBar({ sethistoryIndex, historyIndex, inputHistory, inputRef }) {

  const handleInputKeyDown = (e) => {
    if (e.defaultPrevented) { return; }
    if (!inputHistory.length) { return; }
    if (e.key === 'ArrowUp' || e.key === 'Up') {
      const notBlank = inputRef.current.value;
      if ((!notBlank) || (historyIndex > -1 && historyIndex < inputHistory.length - 1)) {
        const index = Math.min(inputHistory.length - 1, historyIndex);
        inputRef.current.value = inputHistory[index + 1];
        sethistoryIndex((oldIndex) => Math.min(oldIndex + 1, inputHistory.length - 1));
      }
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
      if (historyIndex > -1) {
        const index = Math.max(historyIndex - 1, -1);
        inputRef.current.value = inputHistory[index];
        sethistoryIndex((oldIndex) => Math.max(oldIndex - 1, -1));
        if (index === -1) {
          inputRef.current.value = '';
        }
      }
    } else {
      const keycode = e.keyCode;
      if (
        (keycode > 47 && keycode < 58) || // number keys
        keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91) || // letter keys
        (keycode > 95 && keycode < 112) || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223)   // [\]' (in order)
      ) {
        sethistoryIndex(-1);
      }
    }
  }

  const clearSelectionRange = (e) => {
    const end = inputRef.current.value.length;
    inputRef.current.setSelectionRange(end, end);
  }

  return (
    <InputElement
      type="text"
      ref={inputRef}
      onKeyDown={handleInputKeyDown}
      // onChange={clearSelectionRange}
      placeholder="What action to perform..."
      autoComplete="off" />
  )
}

const mapStatToProps = ({ data, connection }) => {
  return {
    inputHistory: connection.inputHistory,

  };
};

export default connect(mapStatToProps, null)(InputBar);

const InputElement = styled.input`
  padding-left: 25px;
  font-size: 24px;
  border: none;
  display: block;
  color: white;
  background: black;
  width: 100%;


`;