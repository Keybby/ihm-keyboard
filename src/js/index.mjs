import App from "./app.js";

//waits for alpine.js to be installed
document.addEventListener("alpine:init", () => {
  // gets the templates inside <svg>
  var templates = document.querySelectorAll("svg template");
  var el, template, attribs, attrib, count, child, content;
  for (var i = 0; i < templates.length; i++) {
    el = templates[i];
    //creates a new template element in the html
    template = el.ownerDocument.createElement("template");
    el.parentNode.insertBefore(template, el);
    // copies the attributes in the former template to the new one
    attribs = el.attributes;
    count = attribs.length;
    while (count-- > 0) {
      attrib = attribs[count];
      template.setAttribute(attrib.name, attrib.value);
      // deletes the attributes of the old template
      el.removeAttribute(attrib.name);
    }
    // deletes the old template
    el.parentNode.removeChild(el);
    // gets the content of the new template
    content = template.content;
    // moves children of the old template to the new one 
    while ((child = el.firstChild)) {
      content.appendChild(child);
    }
  }
});

// @ts-ignore
window.App = App;
