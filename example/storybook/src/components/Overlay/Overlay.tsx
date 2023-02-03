import { Overlay } from '@universa11y/Overlay';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Wrapper } from '../Wrapper';
// import { useControllableState } from '@universa11y/hooks';

export const OverlayComp = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = React.useCallback(() => setVisible(false), [setVisible]);

  return (
    <Wrapper>
      <Pressable
        onPress={() => {
          setVisible(true);
        }}
      >
        Click to see overlay
      </Pressable>
      <Overlay
        isOpen={visible}
        onRequestClose={handleClose}
        // isKeyboardDismissable={isKeyboardDismissable}
        animationPreset={'fade'}
        // useRNModal={useRNModal}
        // useRNModalOnAndroid
      >
        <View style={{ backgroundColor: 'blue', flex: 1 }}>
          <Text>Hello</Text>
        </View>
      </Overlay>
    </Wrapper>
  );
};

export default OverlayComp;
