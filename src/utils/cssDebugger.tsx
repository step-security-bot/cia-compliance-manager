/**
 * Utility to help debug CSS issues
 * This can be temporarily added to App.tsx or index.tsx to verify CSS loading
 */

export const verifyCssLoading = () => {
  if (typeof document !== "undefined") {
    // Check if our CSS variables are applied
    const html = document.documentElement;
    const computedStyle = getComputedStyle(html);

    // Create debug element
    const debugDiv = document.createElement("div");
    debugDiv.id = "css-debugger";
    debugDiv.style.position = "fixed";
    debugDiv.style.bottom = "10px";
    debugDiv.style.right = "10px";
    debugDiv.style.zIndex = "9999";
    debugDiv.style.padding = "10px";
    debugDiv.style.background = "white";
    debugDiv.style.border = "1px solid #ccc";
    debugDiv.style.maxWidth = "300px";
    debugDiv.style.fontSize = "12px";

    // Check for key CSS variables and classes
    const darkModeEnabled = html.classList.contains("dark");
    const primaryColor = computedStyle.getPropertyValue("--primary-color");
    const bgColor = computedStyle.backgroundColor;

    // Create report
    debugDiv.innerHTML = `
      <h3>CSS Debug Info</h3>
      <p>Dark Mode Class: ${darkModeEnabled ? "YES" : "NO"}</p>
      <p>Primary Color Variable: ${primaryColor || "Not set"}</p>
      <p>Background Color: ${bgColor}</p>
      <p>Stylesheets loaded: ${document.styleSheets.length}</p>
    `;

    // Add test elements for dark/light mode
    const testElement = document.createElement("div");
    testElement.className = "dark:bg-gray-900 bg-white p-2 mt-2";
    testElement.innerHTML =
      '<p class="dark:text-white text-black">Test text</p>';
    debugDiv.appendChild(testElement);

    // Add to document
    document.body.appendChild(debugDiv);

    // Return cleanup function
    return () => {
      if (document.body.contains(debugDiv)) {
        document.body.removeChild(debugDiv);
      }
    };
  }
  return () => {}; // No-op for SSR
};

// Optional: Add to window for console usage
if (typeof window !== "undefined") {
  (window as any).debugCSS = verifyCssLoading;
}

export default verifyCssLoading;
