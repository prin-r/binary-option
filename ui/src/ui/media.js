export default {
  smallMobile: '@media only screen and (max-width: 330px)',
  mobile: '@media only screen and (max-width: 420px)',
  tablet: '@media only screen and (max-width: 960px)',
}

export const isMobile = () => window.innerWidth <= 420
export const isTablet = () => window.innerWidth <= 960
