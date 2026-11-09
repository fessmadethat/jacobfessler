(function () {
  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  var meta = document.querySelector('meta[name="theme-color"]');
  var colors = { light: "#ffffff", dark: "#0a0a0a" };
  var mq = matchMedia("(prefers-color-scheme: dark)");

  function stored() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    if (meta) meta.content = colors[theme];
    if (!btn) return;
    var next = theme === "dark" ? "light" : "dark";
    btn.textContent = next;
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
  }

  apply(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
  if (!btn) return;
  btn.hidden = false;

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Until the visitor picks a theme, keep following the system setting.
  var onChange = function (e) {
    if (!stored()) apply(e.matches ? "dark" : "light");
  };
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();
