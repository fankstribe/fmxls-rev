import { BREAKPOINT } from '@angular/flex-layout';

const MMD_BREAKPOINTS = [
  { alias: 'xs', mediaQuery: 'screen and (max-width: 600px)' },
  {
    alias: 'sm',
    mediaQuery: 'screen and (min-width: 768px) and (max-width: 991px)',
  },
  {
    alias: 'md',
    mediaQuery: 'screen and (min-width: 992px) and (max-width: 1199px)',
  },
  {
    alias: 'lg',
    mediaQuery: 'screen and (min-width: 1200px) and (max-width: 1669px)',
  },
  {
    alias: 'xl',
    mediaQuery: 'screen and (min-width: 1670px) and (max-width: 5000px)',
  },

  { alias: 'lt-sm', mediaQuery: 'screen and (max-width: 767px)' },
  { alias: 'lt-md', mediaQuery: 'screen and (max-width: 991px)' },
  { alias: 'lt-lg', mediaQuery: 'screen and (max-width: 1199px)' },
  { alias: 'lt-xl', mediaQuery: 'screen and (max-width: 1669px)' },

  { alias: 'gt-xs', mediaQuery: 'screen and (min-width: 768px)' },
  { alias: 'gt-sm', mediaQuery: 'screen and (min-width: 992px)' },
  { alias: 'gt-md', mediaQuery: 'screen and (min-width: 1200px)' },
  { alias: 'gt-lg', mediaQuery: 'screen and (min-width: 1670px)' },
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: MMD_BREAKPOINTS,
  multi: true,
};
