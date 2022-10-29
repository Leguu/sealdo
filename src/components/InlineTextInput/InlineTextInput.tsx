import { Edit } from "@carbon/icons-react";
import { TextInput, TextInputProps } from "carbon-components-react";
import { ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import styles from './.module.css';

interface Props extends Omit<TextInputProps, 'id' | 'labelText' | 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  renderLabel?: (value: string) => ReactNode;
}

export const InlineTextInput = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const [previousValue, setPreviousValue] = useState('');

  const startEditing = () => {
    setPreviousValue(props.value);
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
    if (!props.value)
      props.onChange?.(previousValue);
  };

  const ref = useRef(null);
  useOnClickOutside(ref, stopEditing);

  return <>
    {(props.value && !isEditing) && (
      <div onClick={startEditing} className={styles.textDiv}>
        {props.renderLabel ? (
          props.renderLabel(props.value)
        ) : (
          <p> {props.value} </p>
        )}
        <Edit />
      </div>
    )}
    {isEditing && (
      <TextInput
        {...props}
        id={''}
        labelText={''}
        placeholder={previousValue}
        hideLabel
        ref={ref}
        size='sm'
        onChange={e => props.onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && stopEditing()}
        autoFocus
        className={styles.textInput}
      />
    )}
  </>;
};