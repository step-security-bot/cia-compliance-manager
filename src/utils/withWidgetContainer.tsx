import React, { ComponentType } from "react";
import { WidgetContainer } from "../components/common";

interface WithWidgetProps {
  title: string;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large" | "full";
  className?: string;
  testId?: string;
}

/**
 * Higher-order component that wraps any component in a standard WidgetContainer
 * This ensures all widgets have consistent styling and structure
 */
export function withWidgetContainer<P extends object>(
  Component: ComponentType<P>,
  defaultWidgetProps: WithWidgetProps
) {
  return function WidgetWrappedComponent(props: P & Partial<WithWidgetProps>) {
    // Merge default widget props with any provided override props
    const widgetProps = {
      ...defaultWidgetProps,
      title: props.title || defaultWidgetProps.title,
      icon: props.icon || defaultWidgetProps.icon,
      size: props.size || defaultWidgetProps.size,
      className: props.className || defaultWidgetProps.className,
      testId: props.testId || defaultWidgetProps.testId,
    };

    // Remove widget-specific props before passing to wrapped component
    const componentProps = { ...props } as P;
    delete (componentProps as any).title;
    delete (componentProps as any).icon;
    delete (componentProps as any).size;
    delete (componentProps as any).className;
    delete (componentProps as any).testId;

    return (
      <WidgetContainer
        title={widgetProps.title}
        icon={widgetProps.icon}
        size={widgetProps.size}
        className={widgetProps.className}
        testId={widgetProps.testId}
      >
        <Component {...componentProps} />
      </WidgetContainer>
    );
  };
}

export default withWidgetContainer;
