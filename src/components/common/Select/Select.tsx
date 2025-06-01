// Component imports and type definitions
import { FC, useState, useRef, useEffect } from 'react'; 
import { SelectInterface, SelectOptionType } from '@/types';
import './Select.scss'; 

// Custom select component with keyboard navigation and accessibility
export const Select: FC<SelectInterface> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option', 
  size = 'md', 
  variant = 'outlined', 
  className = '', 
  disabled = false, 
  direction = 'down', 
  'aria-label': ariaLabel 
}) => { 
  // Refs for dropdown positioning and width measurement
  const containerRef = useRef<HTMLDivElement>(null); 
  const measureRef = useRef<HTMLDivElement>(null); 
  const widthRef = useRef(40);

  // State for dropdown visibility and keyboard navigation
  const [isOpen, setIsOpen] = useState(false); 
  const [highlightedIndex, setHighlightedIndex] = useState(0); 
  const [width, setWidth] = useState<number | null>(null); 

  // Effects after all state declarations
  // Calculate dropdown width based on option content
  useEffect(() => {
    // Width measurement
    if (measureRef.current) {
      let maxWidth = 40;
      const measurer = measureRef.current;
      
      for (const option of options) {
        measurer.textContent = option.label;
        maxWidth = Math.max(maxWidth, measurer.offsetWidth + 40);
      }
      
      widthRef.current = maxWidth;
      setWidth(maxWidth);
    }
  }, [options]);

  // Handle clicks outside the select component
  useEffect(() => { 
    // Click outside handler
    const handler = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) { 
        setIsOpen(false); 
      }
    };

    document.addEventListener('mousedown', handler); 
    return () => document.removeEventListener('mousedown', handler); 
  }, []); 

  // Derived values after all hooks
  const selectedOption = options.find(opt => opt.value === value); 
  const classes = [ 
    'select', 
    `select-${size}`, 
    `select-${variant}`, 
    isOpen && 'is-open', 
    disabled && 'is-disabled', 
    `select-${direction}`, 
    className 
  ].filter(Boolean).join(' '); 

  // Handle option selection and dropdown state
  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Keyboard navigation and accessibility controls
  const handleKeyDown = (e: React.KeyboardEvent) => { 
    if (disabled) return;

    switch (e.key) { 
      case 'Enter': 
      case ' ': 
        e.preventDefault(); 
        if (isOpen) { 
          onChange(options[highlightedIndex].value); 
          setIsOpen(false); 
        } else { 
          setIsOpen(true); 
        } 
        break; 

      case 'ArrowUp': 
        e.preventDefault(); 
        if (!isOpen) { 
          setIsOpen(true); 
        } else { 
          setHighlightedIndex(Math.max(0, highlightedIndex - 1)); 
        } 
        break; 

      case 'ArrowDown': 
        e.preventDefault(); 
        if (!isOpen) { 
          setIsOpen(true); 
        } else { 
          setHighlightedIndex(Math.min(options.length - 1, highlightedIndex + 1)); 
        } 
        break; 

      case 'Escape': 
        if (isOpen) { 
          setIsOpen(false); 
        } 
        break; 
    } 
  }; 

  return ( 
    <div 
      ref={containerRef} 
      className={classes} 
      onKeyDown={handleKeyDown} 
      tabIndex={disabled ? -1 : 0} 
      role="combobox"
      aria-controls={`select-${options[0]?.value || 'options'}`}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-activedescendant={isOpen ? `select-option-${highlightedIndex}` : undefined}
      aria-label={ariaLabel || 'Select'} 
      style={{ width: width ? `${width}px` : undefined }} 
    > 
      <div 
        ref={measureRef} 
        style={{ 
          position: 'absolute', 
          visibility: 'hidden', 
          whiteSpace: 'nowrap', 
          fontFamily: 'inherit', 
          fontSize: 'inherit', 
          fontWeight: 'inherit' 
        }} 
      /> 

      <div 
        className="select-trigger" 
        onClick={() => !disabled && setIsOpen(!isOpen)} 
      > 
        <span className="select-value"> 
          {selectedOption ? selectedOption.label : placeholder} 
        </span> 
        <span className="select-arrow" aria-hidden="true" /> 
      </div> 

      {isOpen && !disabled && ( 
        <div 
          className="select-dropdown" 
          role="listbox"
          id={`select-${options[0]?.value || 'options'}`}
          data-direction={direction}
        > 
          {options.map((option: SelectOptionType, index) => ( 
            <div 
              key={option.value} 
              className={[ 
                'select-option', 
                option.value === value && 'is-selected', 
                index === highlightedIndex && 'is-highlighted' 
              ].filter(Boolean).join(' ')} 
              onClick={() => handleOptionClick(option.value)} 
              role="option"
              id={`select-option-${index}`}
              aria-selected={option.value === value} 
            > 
              {option.label} 
            </div> 
          ))} 
        </div> 
      )} 
    </div> 
  ); 
}; 

Select.displayName = 'Select';
