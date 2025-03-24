import CardContainer from './container';
import type { CardProps, CardWithChildrenProps, CardWithTitleProps } from './types';

export { CardProps, CardWithChildrenProps, CardWithTitleProps };

// Re-export the container as the main Card component
export const Card = CardContainer;
export default Card;
