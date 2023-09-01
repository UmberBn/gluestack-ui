// @ts-nocheck
import { styled } from '../../styled';
import { TextInput } from 'react-native';

export default styled(
  TextInput,
  {
    flex: 1,
    color: '$textLight900',
    props: {
      placeholderTextColor: '$textLight500',
    },
    _dark: {
      color: '$textDark50',
      props: {
        placeholderTextColor: '$textDark400',
      },
    },
    _web: {
      'cursor': 'text',
      ':disabled': {
        cursor: 'not-allowed',
      },
    },
  },
  {
    componentName: 'InputField',
    ancestorStyle: ['_input'],
    resolveProps: ['placeholderTextColor'],
  } as const,
  {
    propertyTokenMap: {
      placeholderTextColor: 'colors',
    },
  }
);