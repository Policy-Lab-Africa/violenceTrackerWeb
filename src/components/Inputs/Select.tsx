import { Select } from 'chakra-react-select';
// import Select from 'react-select';
import React from 'react';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

// interface SelectProps {}

export default function ChakraReactSelect(props: StateManagerProps) {
  const { size, ...otherProps } = props;
  return (
    <Select
      {...otherProps}
      size={size}
      useBasicStyles
      variant="filled"
      isSearchable={true}
      selectedOptionStyle="color"
      selectedOptionColor="primary"
      chakraStyles={{
        valueContainer: (provided) => ({
          ...provided,
          backgroundColor: `white`,
          fontSize: `sm`,
        }),
        placeholder: (provided) => ({
          ...provided,
          color: `#718196`,
          fontSize: `sm`,
        }),
        option: (provided) => ({
          ...provided,
          color: `secondary.700`,
          fontSize: `sm`,
        }),
        input: (provided) => ({
          ...provided,
          color: `secondary.700`,
          fontSize: `sm`,
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          backgroundColor: `white`,
        }),
        container: (provided) => ({
          ...provided,
          fontSize: `sm`,
          fontWeight: `semibold`,
          color: `secondary.700`,
        }),
        // menuList: (provided) => ({
        //   ...provided,
        //   fontSize: `sm`,
        //   color: `secondary.700`,
        //   backgroundColor: `primary.100`,
        // }),
      }}
    />
  );
}
