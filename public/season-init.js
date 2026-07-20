// Sets data-season on <html> before the page becomes interactive, from the
// visitor's current month (meteorological seasons): Mar–May spring, Jun–Aug
// summer, Sep–Nov autumn, Dec–Feb winter. Loaded via next/script
// strategy="beforeInteractive" so it runs on every load (correct even for a
// statically cached page) with no flash of the wrong palette. Summer is the
// site's original palette, so its attribute simply falls back to the defaults.
(function () {
  try {
    var m = new Date().getMonth();
    var s =
      m <= 1 || m === 11 ? "winter" : m <= 4 ? "spring" : m <= 7 ? "summer" : "autumn";
    document.documentElement.setAttribute("data-season", s);
  } catch (e) {}
})();
