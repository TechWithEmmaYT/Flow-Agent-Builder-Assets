(function () {
  var script = document.currentScript;
  var workflowId = (script && script.getAttribute("data-workflow-id")) || "";
  var scriptSrc = script && script.src;
  var baseUrl = scriptSrc
    ? scriptSrc.substring(0, scriptSrc.lastIndexOf("/"))
    : "";
  var chatSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 70 56" class="nuxt-icon" height="30px" width="30px">' +
    '<path fill="white" d="m27.377 44.368 11.027 11.53 8.597-13.663 22.813-2.48L66.132.284.214 7.447 3.895 46.92l23.482-2.552Z"/>' +
    "</svg>";

  var closeSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" height="30px" width="30px">' +
    '<path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";
  // Create floating button
  var btn = document.createElement("button");
  btn.innerHTML = chatSVG;
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "999999",
    width: "56px",
    height: "56px",
    padding: "0",
    borderRadius: "50%",
    background: "#6366f1",
    border: "none",
    boxShadow: "0 2px 8px #0002",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s",
  });
  document.body.appendChild(btn);
  // Preload iframe immediately
  var iframe = document.createElement("iframe");
  iframe.src = baseUrl + "/index.html?workflow_id=" + workflowId;
  Object.assign(iframe.style, {
    visibility: "hidden",
    pointerEvents: "none",
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "370px",
    height: "570px",
    zIndex: "99999",
    borderRadius: "16px",
    border: "none",
    boxShadow: "0 4px 32px #0003",
    background: "#fff",
    opacity: "0",
    transition: "opacity 0.2s ease-in-out",
  });
  iframe.onload = function () {
    iframe.style.opacity = "1";
  };
  document.body.appendChild(iframe);
  btn.onclick = function () {
    var isOpen = iframe.style.visibility === "visible";

    if (isOpen) {
      iframe.style.visibility = "hidden";
      iframe.style.pointerEvents = "none";
      btn.innerHTML = chatSVG;
    } else {
      iframe.style.visibility = "visible";
      iframe.style.pointerEvents = "auto";
      btn.innerHTML = closeSVG;
    }
  };
})();
