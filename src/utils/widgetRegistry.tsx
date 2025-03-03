import React, { ReactNode } from "react";
import { WidgetContainer } from "../components/common";
import { WIDGET_ICONS } from "../constants/appConstants";
import { UI_TEXT } from "../constants";

// Class to manage available widgets and their configurations
class WidgetRegistry {
  private widgets: Map<string, WidgetDefinition> = new Map();

  // Register a widget with the system
  register(widgetDef: WidgetDefinition): void {
    this.widgets.set(widgetDef.id, {
      order: 999, // Default order if not specified
      size: "medium", // Default size if not specified
      ...widgetDef,
    });
  }

  // Get a specific widget by ID
  get(id: string): WidgetDefinition | undefined {
    return this.widgets.get(id);
  }

  // Get all registered widgets
  getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values()).sort(
      (a, b) => a.order! - b.order!
    );
  }

  // Render a specific widget with props
  renderWidget(id: string, props: any = {}): ReactNode {
    const widget = this.widgets.get(id);
    if (!widget) return null;

    const combinedProps = { ...widget.defaultProps, ...props };

    return (
      <WidgetContainer
        key={widget.id}
        title={widget.title}
        icon={widget.icon}
        size={widget.size}
        testId={`widget-${widget.id}`}
      >
        <widget.component {...combinedProps} />
      </WidgetContainer>
    );
  }

  // Render all widgets that match a filter
  renderWidgets(
    filter?: (widget: WidgetDefinition) => boolean,
    props: Record<string, any> = {}
  ): ReactNode[] {
    const widgetsToRender = Array.from(this.widgets.values())
      .filter(filter || (() => true))
      .sort((a, b) => a.order! - b.order!);

    return widgetsToRender.map((widget) => {
      const widgetProps = props[widget.id] || {};
      const combinedProps = { ...widget.defaultProps, ...widgetProps };

      return (
        <WidgetContainer
          key={widget.id}
          title={widget.title}
          icon={widget.icon}
          size={widget.size}
          testId={`widget-${widget.id}`}
        >
          <widget.component {...combinedProps} />
        </WidgetContainer>
      );
    });
  }
}

// Create and export a singleton instance
export const widgetRegistry = new WidgetRegistry();

// Fix: Import components directly instead of using require()
// This avoids issues during testing
import SecuritySummaryWidget from "../components/widgets/SecuritySummaryWidget";
import ComplianceStatusWidget from "../components/widgets/ComplianceStatusWidget";
import ValueCreationWidget from "../components/widgets/ValueCreationWidget";
import CostEstimationWidget from "../components/widgets/CostEstimationWidget";
import BusinessImpactAnalysisWidget from "../components/widgets/BusinessImpactAnalysisWidget";

// Pre-register core widgets
widgetRegistry.register({
  id: "security-summary",
  title: UI_TEXT.WIDGET_TITLES.SECURITY_SUMMARY,
  component: SecuritySummaryWidget,
  icon: WIDGET_ICONS.SECURITY_SUMMARY,
  size: "medium",
  order: 10,
});

widgetRegistry.register({
  id: "compliance-status",
  title: UI_TEXT.WIDGET_TITLES.COMPLIANCE_STATUS,
  component: ComplianceStatusWidget,
  icon: WIDGET_ICONS.COMPLIANCE_STATUS,
  size: "medium",
  order: 20,
});

widgetRegistry.register({
  id: "value-creation",
  title: UI_TEXT.WIDGET_TITLES.VALUE_CREATION,
  component: ValueCreationWidget,
  icon: WIDGET_ICONS.VALUE_CREATION,
  size: "medium",
  order: 30,
});

widgetRegistry.register({
  id: "cost-estimation",
  title: UI_TEXT.WIDGET_TITLES.COST_ESTIMATION,
  component: CostEstimationWidget,
  icon: WIDGET_ICONS.COST_ESTIMATION,
  size: "medium",
  order: 40,
});

widgetRegistry.register({
  id: "availability-impact",
  title: UI_TEXT.WIDGET_TITLES.AVAILABILITY_IMPACT,
  component: BusinessImpactAnalysisWidget,
  defaultProps: { category: "Availability" },
  icon: WIDGET_ICONS.AVAILABILITY_IMPACT,
  size: "medium",
  order: 50,
});

widgetRegistry.register({
  id: "integrity-impact",
  title: UI_TEXT.WIDGET_TITLES.INTEGRITY_IMPACT,
  component: BusinessImpactAnalysisWidget,
  defaultProps: { category: "Integrity" },
  icon: WIDGET_ICONS.INTEGRITY_IMPACT,
  size: "medium",
  order: 60,
});

widgetRegistry.register({
  id: "confidentiality-impact",
  title: UI_TEXT.WIDGET_TITLES.CONFIDENTIALITY_IMPACT,
  component: BusinessImpactAnalysisWidget,
  defaultProps: { category: "Confidentiality" },
  icon: WIDGET_ICONS.CONFIDENTIALITY_IMPACT,
  size: "medium",
  order: 70,
});

export default widgetRegistry;
