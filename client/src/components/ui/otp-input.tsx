import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface OtpInputProps {
  length: number;
  onComplete: (code: string) => void;
}

export function OtpInput({ length, onComplete }: OtpInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Check if the code is complete
    if (code.every(digit => digit !== '')) {
      onComplete(code.join(''));
    }
  }, [code, onComplete]);

  const handleChange = (index: number, value: string) => {
    // Allow only single digit
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Move to next input if value is entered
      if (value && index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0 && inputRefs.current[index - 1]) {
        // If current input is empty, move to previous input and clear it
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1].focus();
      } else if (code[index]) {
        // Clear current input if it has a value
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
    
    // Handle left arrow
    if (e.key === 'ArrowLeft' && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    
    // Handle right arrow
    if (e.key === 'ArrowRight' && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content is numeric and has correct length
    if (/^\d+$/.test(pastedData) && pastedData.length <= length) {
      const newCode = [...code];
      
      // Fill in the code with pasted digits
      for (let i = 0; i < pastedData.length; i++) {
        if (i < length) {
          newCode[i] = pastedData[i];
        }
      }
      
      setCode(newCode);
      
      // Focus the next empty input or the last input if all are filled
      const nextEmptyIndex = newCode.findIndex(digit => digit === '');
      const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
      
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    }
  };

  return (
    <div className="flex space-x-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={code[index]}
          ref={el => inputRefs.current[index] = el}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
      ))}
    </div>
  );
}
