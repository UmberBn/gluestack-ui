'use client';
import React from 'react';
import { createFab } from '@gluestack-ui/fab';
import { Platform, Text, View } from 'react-native';
import { Pressable } from 'react-native';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import {
  withStyleContext,
  useStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';
import { withStyleContextAndStates } from '@gluestack-ui/nativewind-utils/withStyleContextAndStates';
import { cssInterop } from '@gluestack-ui/nativewind-utils/cssInterop';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';

const SCOPE = 'FAB';
const UIFab = createFab({
  Root:
    Platform.OS === 'web'
      ? withStyleContext(Pressable, SCOPE)
      : withStyleContextAndStates(Pressable, SCOPE),
  Label: Text,
  Icon: View,
});

cssInterop(UIFab, { className: 'style' });
cssInterop(UIFab.Label, { className: 'style' });
cssInterop(UIFab.Icon, { className: 'style' });

const fabStyle = tva({
  base: 'group/fab bg-primary-500 rounded-full z-20 p-4 flex-row items-center justify-center absolute hover:bg-primary-600 active:bg-primary-700 disabled:opacity-40 disabled:pointer-events-all disabled:cursor-not-allowed data-[focus=true]:web:outline-none data-[focus-visible=true]:web:ring-2 data-[focus-visible=true]:web:ring-primary-700',
  variants: {
    size: {
      sm: 'px-2.5 py-2.5',
      md: 'px-3 py-3',
      lg: 'px-4 py-4',
    },
    placement: {
      'top right': 'top-4 right-4',
      'top left': 'top-4 left-4',
      'bottom right': 'bottom-4 right-4',
      'bottom left': 'bottom-4 left-4',
      'top center': 'top-4 self-center',
      'bottom center': 'bottom-4 self-center',
    },
  },
});

const fabLabelStyle = tva({
  base: 'text-typography-50 font-normal font-body tracking-md text-left mx-2',
  variants: {
    isTruncated: {
      true: '',
    },
    bold: {
      true: 'font-bold',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    size: {
      '2xs': 'text-2xs',
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    sub: {
      true: 'text-xs',
    },
    italic: {
      true: 'italic',
    },
    highlight: {
      true: 'bg-yellow-500',
    },
  },
  parentVariants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
});

const fabIconStyle = tva({
  base: 'text-typography-50 group-hover/fab:text-typography-0 group-active/fab:text-typography-0',
  variants: {
    size: {
      '2xs': 'h-3 w-3',
      'xs': 'h-3.5 w-3.5',
      'sm': 'h-4 w-4',
      'md': 'w-[18px] h-[18px]',
      'lg': 'h-5 w-5',
      'xl': 'h-6 w-6',
    },
  },
});

type IFabProps = Omit<React.ComponentProps<typeof UIFab>, 'context'> &
  VariantProps<typeof fabStyle>;
const Fab = React.forwardRef(
  (
    {
      size = 'md',
      placement = 'bottom right',
      className,
      ...props
    }: { className?: string } & IFabProps,
    ref?: any
  ) => {
    return (
      <UIFab
        ref={ref}
        {...props}
        className={fabStyle({ size, placement, class: className })}
        context={{ size }}
      />
    );
  }
);

type IFabLabelProps = React.ComponentProps<typeof UIFab.Label> &
  VariantProps<typeof fabLabelStyle>;
const FabLabel = React.forwardRef(
  (
    {
      size,
      isTruncated = false,
      bold = false,
      underline = false,
      strikeThrough = false,
      className,
      ...props
    }: { className?: string } & IFabLabelProps,
    ref?: any
  ) => {
    const { size: parentSize } = useStyleContext(SCOPE);
    return (
      <UIFab.Label
        ref={ref}
        {...props}
        className={fabLabelStyle({
          parentVariants: {
            size: parentSize,
          },
          size,
          isTruncated,
          bold,
          underline,
          strikeThrough,
          class: className,
        })}
      />
    );
  }
);

type IFabIconProps = React.ComponentProps<typeof UIFab.Icon> &
  VariantProps<typeof fabIconStyle>;
const FabIcon = React.forwardRef(
  (
    {
      size,
      className,
      as: AsComp,
      fill = 'none',
      ...props
    }: {
      className?: string;
      as?: any;
      fill?: string;
      color?: string;
    } & IFabIconProps,
    ref?: any
  ) => {
    const { size: parentSize } = useStyleContext(SCOPE);
    const { color = 'gray' } = props;

    if (AsComp) {
      return (
        <View
          className={fabIconStyle({
            parentVariants: {
              size: parentSize,
            },
            size,
            class: className,
          })}
        >
          <AsComp
            ref={ref}
            {...props}
            height={'100%'}
            width={'100%'}
            fill={fill}
            color={color}
          />
        </View>
      );
    }
    return (
      <UIFab.Icon
        ref={ref}
        {...props}
        className={fabIconStyle({
          parentVariants: {
            size: parentSize,
          },
          size,
          class: className,
        })}
        // @ts-ignore
        fill={fill}
        color={color}
      />
    );
  }
);

Fab.displayName = 'Fab';
FabLabel.displayName = 'FabLabel';
FabIcon.displayName = 'FabIcon';

export { Fab, FabLabel, FabIcon };
