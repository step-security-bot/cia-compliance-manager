import React from "react";
import ValueDisplay from "../common/ValueDisplay";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";
import MetricsCard from "../common/MetricsCard";
import { SECURITY_LEVELS } from "../../constants/appConstants";

const StyleGuide: React.FC = () => {
  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <div className="prose dark:prose-invert max-w-none">
        <h1>UI Component Style Guide</h1>
        <p>
          This style guide demonstrates the common UI components used throughout
          the CIA Compliance Manager, with standardized styling for values,
          badges, and metrics.
        </p>
      </div>

      {/* Value Display Component Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Value Display Component</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          The ValueDisplay component provides consistent styling for
          application-generated values.
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Security Levels</h3>
              <div className="space-y-2">
                <ValueDisplay
                  label="Very High"
                  value={SECURITY_LEVELS.VERY_HIGH}
                  variant="success"
                  testId="security-level-very-high"
                />
                <ValueDisplay
                  label="High"
                  value={SECURITY_LEVELS.HIGH}
                  variant="primary"
                  testId="security-level-high"
                />
                <ValueDisplay
                  label="Moderate"
                  value={SECURITY_LEVELS.MODERATE}
                  variant="info"
                  testId="security-level-moderate"
                />
                <ValueDisplay
                  label="Low"
                  value={SECURITY_LEVELS.LOW}
                  variant="warning"
                  testId="security-level-low"
                />
                <ValueDisplay
                  label="None"
                  value={SECURITY_LEVELS.NONE}
                  variant="danger"
                  testId="security-level-none"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Business Metrics</h3>
              <div className="space-y-2">
                <ValueDisplay
                  label="ROI"
                  value="240%"
                  variant="success"
                  testId="roi-display"
                />
                <ValueDisplay
                  label="Annual Revenue"
                  value="$1,245,000"
                  variant="primary"
                  testId="revenue-display"
                />
                <ValueDisplay
                  label="Implementation Time"
                  value="3-6 months"
                  variant="info"
                  testId="implementation-display"
                />
                <ValueDisplay
                  label="Risk Level"
                  value="Medium"
                  variant="warning"
                  testId="risk-display"
                />
                <ValueDisplay
                  label="Data Loss"
                  value="Critical"
                  variant="danger"
                  testId="data-loss-display"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Status Badges Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Status Badges</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Status badges provide consistent visual indicators for compliance
          status, risk level, and progress.
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Compliance Status</h3>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="success" testId="status-compliant">
                Compliant
              </StatusBadge>
              <StatusBadge status="warning" testId="status-partial">
                Partial Compliance
              </StatusBadge>
              <StatusBadge status="error" testId="status-non-compliant">
                Non-Compliant
              </StatusBadge>
              <StatusBadge status="info" testId="status-in-review">
                In Review
              </StatusBadge>
              <StatusBadge status="neutral" testId="status-na">
                Not Applicable
              </StatusBadge>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">With Icons</h3>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="success" icon="✅" testId="icon-success">
                Passed
              </StatusBadge>
              <StatusBadge status="warning" icon="⚠️" testId="icon-warning">
                Warning
              </StatusBadge>
              <StatusBadge status="error" icon="❌" testId="icon-error">
                Failed
              </StatusBadge>
              <StatusBadge status="info" icon="ℹ️" testId="icon-info">
                Info
              </StatusBadge>
              <StatusBadge status="neutral" icon="⏱️" testId="icon-neutral">
                Pending
              </StatusBadge>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Sizes</h3>
            <div className="flex flex-wrap gap-2 items-center">
              <StatusBadge status="success" size="xs" testId="size-xs">
                Extra Small
              </StatusBadge>
              <StatusBadge status="success" size="sm" testId="size-sm">
                Small
              </StatusBadge>
              <StatusBadge status="success" size="md" testId="size-md">
                Medium
              </StatusBadge>
            </div>
          </div>
        </div>
      </section>

      {/* Key-Value Pairs Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Key-Value Pairs</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Key-Value Pairs provide a consistent way to display label and value
          combinations.
        </p>

        <div className="space-y-4 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
          <KeyValuePair
            label="Uptime SLA"
            value="99.95%"
            testId="uptime-kv"
            highlighted
          />
          <KeyValuePair label="Monthly Cost" value="$12,500" testId="cost-kv" />
          <KeyValuePair
            label="Implementation Time"
            value="3-6 months"
            testId="implementation-kv"
          />
          <KeyValuePair
            label="Security Level"
            value={<ValueDisplay value="High" variant="primary" size="sm" />}
            testId="security-level-kv"
            highlighted
          />
          <KeyValuePair
            label="Compliance Status"
            value={<StatusBadge status="success">Compliant</StatusBadge>}
            testId="compliance-kv"
          />
        </div>
      </section>

      {/* Metrics Cards Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Metrics Cards</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Metrics cards provide a standardized way to display key business
          metrics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard
            title="Total CAPEX"
            value="$120,000"
            icon="💰"
            testId="capex-metric"
          />
          <MetricsCard
            title="Annual OPEX"
            value="$45,000"
            icon="🔄"
            trend={{
              direction: "down",
              value: "12% YoY",
            }}
            testId="opex-metric"
          />
          <MetricsCard
            title="ROI"
            value="240%"
            icon="📈"
            trend={{
              direction: "up",
              value: "15%",
            }}
            testId="roi-metric"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <MetricsCard
            title="Recovery Time Objective"
            value="4 hours"
            icon="⏱️"
            testId="rto-metric"
          />
          <MetricsCard
            title="Recovery Point Objective"
            value="15 minutes"
            icon="📊"
            testId="rpo-metric"
          />
        </div>
      </section>

      {/* Combined Components Example Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Combined Components Example
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Security Assessment Summary</h3>
              <StatusBadge status="success">Compliant</StatusBadge>
            </div>

            <div className="space-y-2 mb-4">
              <KeyValuePair
                label="Overall Security Level"
                value={
                  <ValueDisplay
                    value="High"
                    variant="primary"
                    size="md"
                    testId="overall-security-level"
                  />
                }
                testId="overall-security-level-kv"
                highlighted
              />
              <div className="grid grid-cols-3 gap-2 mt-3">
                <MetricsCard
                  title="Availability"
                  value="High"
                  icon="⏱️"
                  testId="availability-metric"
                />
                <MetricsCard
                  title="Integrity"
                  value="High"
                  icon="🔐"
                  testId="integrity-metric"
                />
                <MetricsCard
                  title="Confidentiality"
                  value="Very High"
                  icon="🔏"
                  testId="confidentiality-metric"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-medium mb-2">Business Impact</h4>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-md">
                <p className="text-sm">
                  Comprehensive protection for business-critical data and
                  operations, providing strong safeguards against data theft,
                  corruption, and system downtime.
                </p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <StatusBadge status="success" size="xs">
                    Strong Protection
                  </StatusBadge>
                  <StatusBadge status="info" size="xs">
                    Sensitive Data Ready
                  </StatusBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Usage Guidelines</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h3>When to Use Each Component</h3>

          <h4>ValueDisplay</h4>
          <ul>
            <li>
              Use for displaying application-generated values that should be
              visually distinct from labels
            </li>
            <li>
              Use for metrics, calculated values, and system-determined statuses
            </li>
            <li>
              Choose variant based on semantic meaning (success, warning, etc.)
            </li>
          </ul>

          <h4>StatusBadge</h4>
          <ul>
            <li>
              Use for showing compliance status, approval states, and risk
              levels
            </li>
            <li>Use in tables, lists, and headers to indicate item state</li>
            <li>Keep text very short (1-3 words maximum)</li>
          </ul>

          <h4>KeyValuePair</h4>
          <ul>
            <li>Use for displaying field:value combinations in detail views</li>
            <li>Use consistently for all property listings</li>
            <li>Use highlighted prop only for the most important properties</li>
          </ul>

          <h4>MetricsCard</h4>
          <ul>
            <li>
              Use for displaying key performance indicators and important
              metrics
            </li>
            <li>Use in dashboards and summary sections</li>
            <li>Include trends when temporal comparison is valuable</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default StyleGuide;
