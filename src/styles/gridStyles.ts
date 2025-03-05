/**
 * Centralized grid styles for dashboard layout
 */

// Base grid container styles
export const gridClasses = `
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-3 
  xl:grid-cols-4 
  gap-4 
  p-4
`;

// Widget container styles
export const widgetClasses = `
  bg-white 
  dark:bg-gray-800 
  rounded-lg 
  shadow-sm 
  border 
  border-gray-200 
  dark:border-gray-700 
  overflow-hidden 
  flex 
  flex-col
`;

// Widget header styles
export const headerClasses = `
  p-4 
  border-b 
  border-gray-100 
  dark:border-gray-700
`;

// Widget content styles
export const contentClasses = `
  p-4 
  flex-1 
  overflow-auto
`;

// Grid style object for inline style application
export const gridStyle = {
  display: "flex",
  flexDirection: "column" as const,
};

// Responsive grid configuration
export const gridConfig = {
  sm: 1, // 1 column on small screens
  md: 2, // 2 columns on medium screens
  lg: 3, // 3 columns on large screens
  xl: 4, // 4 columns on extra large screens
};

// Sizing constants for widgets
export const widgetSizes = {
  small: "col-span-1",
  medium: "col-span-2",
  large: "col-span-3",
  full: "col-span-full",
};
