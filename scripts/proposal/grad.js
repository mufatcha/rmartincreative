// Colors each letter of every .grad element along the brand gradient
// (#7c3aed -> #d946ef -> #f59e0b). The gradient runs across the whole phrase,
// even when it wraps onto a second line.
(function () {
  var stops = [
    [0, [0x7c, 0x3a, 0xed]],
    [0.55, [0xd9, 0x46, 0xef]],
    [1, [0xf5, 0x9e, 0x0b]],
  ];
  function color(t) {
    for (var i = 1; i < stops.length; i++) {
      if (t <= stops[i][0]) {
        var a = stops[i - 1], b = stops[i], f = (t - a[0]) / (b[0] - a[0]);
        return "rgb(" + a[1].map(function (x, k) { return Math.round(x + (b[1][k] - x) * f); }).join(",") + ")";
      }
    }
    return "rgb(245,158,11)";
  }
  document.querySelectorAll(".grad").forEach(function (el) {
    var text = el.textContent, n = Math.max(text.length - 1, 1);
    el.textContent = "";
    for (var i = 0; i < text.length; i++) {
      if (text[i] === " ") { el.appendChild(document.createTextNode(" ")); continue; }
      var s = document.createElement("span");
      s.style.color = color(i / n);
      s.textContent = text[i];
      el.appendChild(s);
    }
  });
})();
