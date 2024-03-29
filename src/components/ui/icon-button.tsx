import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { DefaultProps } from '@/types/styles'
import { createPolymorphicComponent } from '@/lib/create-polymorphic-component'
import { cn } from '@/lib/utils'
import { UnstyledButton } from '@/components/ui/unstyled-button'
import { Icons } from '@/components/icons'

const iconButtonVariants = cva(
  'transition-all active:scale-95 flex inline-flex items-center justify-center rounded-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none shadow-md',
  {
    variants: {
      variant: {
        default: 'bg-brand-500 text-gray-900 hover:bg-brand-600',
        contrast: 'bg-white text-gray-900 hover:bg-gray-300',
      },
      size: {
        default: 'p-4',
        sm: 'p-2',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ComponentProps
  extends DefaultProps,
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  loading?: boolean
  icon: React.ReactNode
}

const _IconButton = React.forwardRef<HTMLButtonElement, ComponentProps>(
  (props, ref) => {
    const { className, variant, disabled, size, loading, icon, ...other } =
      props
    const isDisabled = disabled || loading

    return (
      <UnstyledButton
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        data-disabled={disabled || undefined}
        data-loading={loading || undefined}
        {...other}
      >
        {loading ? <Icons.spinner className="h-6 w-6 animate-spin" /> : icon}
      </UnstyledButton>
    )
  }
)
_IconButton.displayName = 'IconButton'

const IconButton = createPolymorphicComponent<'button', ComponentProps>(
  _IconButton
)

export { IconButton, iconButtonVariants }
