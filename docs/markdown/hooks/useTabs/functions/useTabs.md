[**CIA Compliance Manager — Markdown Documentation v1.1.104**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useTabs](../README.md) / useTabs

# Function: useTabs()

> **useTabs**(`tabs`, `options?`): [`UseTabsReturn`](../../../types/tabs/interfaces/UseTabsReturn.md)

Defined in: [hooks/useTabs.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/c7d5254d855bc10f378adc2213f7487f1b036e2d/src/hooks/useTabs.ts#L39)

Hook for managing tab state with keyboard navigation

This hook provides:
- Tab selection state management
- Keyboard navigation (Arrow Left/Right, Home, End)
- Focus management for tab buttons
- Support for disabled tabs

## Parameters

### tabs

[`Tab`](../../../types/tabs/interfaces/Tab.md)[]

Array of tab configurations

### options?

[`UseTabsOptions`](../../../types/tabs/interfaces/UseTabsOptions.md) = `{}`

Optional configuration for initial tab and change callback

## Returns

[`UseTabsReturn`](../../../types/tabs/interfaces/UseTabsReturn.md)

Tab state and handlers

## Example

```tsx
const tabs: Tab[] = [
  { id: 'tab1', label: 'First Tab', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Second Tab', content: <div>Content 2</div> },
];

const { activeTab, selectTab, handleKeyDown, tabRefs } = useTabs(tabs, {
  initialTab: 'tab1',
  onChange: (tabId) => console.log('Tab changed to:', tabId),
});
```
