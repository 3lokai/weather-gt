'use client';

import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  type MouseEventHandler,
  useContext,
} from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/phosphor-icon';
import { cn } from '@/lib/utils';

type BannerContextProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const BannerContext = createContext<BannerContextProps>({
  show: true,
  setShow: () => {},
});

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
  visible?: boolean;
  defaultVisible?: boolean;
  onClose?: () => void;
  inset?: boolean;
};

export const Banner = ({
  children,
  visible,
  defaultVisible = true,
  onClose,
  className,
  inset = false,
  ...props
}: BannerProps) => {
  const [show, setShow] = useControllableState({
    defaultProp: defaultVisible,
    prop: visible,
    onChange: onClose,
  });

  if (!show) {
    return null;
  }

  return (
    <BannerContext.Provider value={{ show, setShow }}>
      <div
        className={cn(
          'w-full bg-card/95 backdrop-blur-sm border-b border-border/50 shadow-sm',
          inset ? 'rounded-lg border' : 'rounded-b-lg',
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 py-3">
            {children}
          </div>
        </div>
      </div>
    </BannerContext.Provider>
  );
};

export type BannerIconProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
};

export const BannerIcon = ({
  name,
  className,
  ...props
}: BannerIconProps) => (
  <div
    className={cn(
      'rounded-full border border-background/20 bg-background/10 p-1 shadow-sm',
      className
    )}
    {...props}
  >
    <Icon name={name} size={16} color="foreground" />
  </div>
);

export type BannerTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const BannerTitle = ({ className, ...props }: BannerTitleProps) => (
  <p className={cn('flex-1 text-sm font-medium', className)} {...props} />
);

export type BannerDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export const BannerDescription = ({ className, ...props }: BannerDescriptionProps) => (
  <p className={cn('flex-1 text-xs text-muted-foreground mt-1', className)} {...props} />
);

export type BannerActionProps = ComponentProps<typeof Button>;

export const BannerAction = ({
  variant = 'outline',
  size = 'sm',
  className,
  ...props
}: BannerActionProps) => (
  <Button
    className={cn(
      'shrink-0',
      // Only apply default transparent styling if no custom background is provided
      !className?.includes('bg-') && 'bg-transparent hover:bg-background/10 hover:text-background',
      className
    )}
    size={size}
    variant={variant}
    {...props}
  />
);

export type BannerCloseProps = ComponentProps<typeof Button>;

export const BannerClose = ({
  variant = 'ghost',
  size = 'icon',
  onClick,
  className,
  ...props
}: BannerCloseProps) => {
  const { setShow } = useContext(BannerContext);
  
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setShow(false);
    onClick?.(e);
  };

  return (
    <Button
      className={cn(
        'shrink-0 bg-transparent hover:bg-background/10 hover:text-background',
        className
      )}
      onClick={handleClick}
      size={size}
      variant={variant}
      {...props}
    >
      <Icon name="X" size={18} color="foreground" />
    </Button>
  );
};
