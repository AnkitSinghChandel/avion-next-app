import "./RippleEffect.css";

document.addEventListener("pointerdown", (e) => {
  const target = e.target.closest(".ripple");
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  const ripple = document.createElement("span");
  ripple.className = "ripple-effect";

  // click position OR center fallback
  const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
  const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  target.appendChild(ripple);

  // remove after animation
  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
});
