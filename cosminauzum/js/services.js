const center = { x: 325, y: 175 };
const serv_dist = 250;
const pointer_dist = 172;
const pointer_time = 2;
const icon_size = 42;
const circle_radius = 38;
const text_top_margin = 18;
const tspan_delta = 16;

//name is used as the title for the bubble
//icon is the id of the corresponding svg symbol
const services_data = [
{ name: "Responsive Design", icon: "responsive_design" },
{ name: "Custom Features", icon: "custom_features" },
{ name: "SEO Optimization", icon: "seo_optimization" },
{ name: "Website Maintenancee", icon: "website_maintenance" },
{ name: "UI/UX Design", icon: "ui/ux_design" },
{ name: "Web Development", icon: "web_development" },
{ name: "Web Consultation", icon: "web_consultation" }];


const services = document.getElementById("service-collection");
const nav_container = document.getElementById("circle-nav-services");
const symbol_copy = document.getElementById("circle-nav-copy");
const use_copy = document.querySelector("use.nav-copy");

//Keeps code DRY avoiding namespace for element creation
function createSVGElement(el) {
  return document.createElementNS("http://www.w3.org/2000/svg", el);
}

//Quick setup for multiple attributes
function setAttributes(el, options) {
  Object.keys(options).forEach(function (attr) {
    el.setAttribute(attr, options[attr]);
  });
}

//Service bubbles are created dynamically
function addService(serv, index) {
  let group = createSVGElement("g");
  group.setAttribute("class", "service serv-" + index);

  /* This group is needed to apply animations in
    the icon and its background at the same time */
  let icon_group = createSVGElement("g");
  icon_group.setAttribute("class", "icon-wrapper");

  let circle = createSVGElement("circle");
  setAttributes(circle, {
    r: circle_radius,
    cx: center.x,
    cy: center.y });

  let circle_shadow = circle.cloneNode();
  setAttributes(circle, {
    class: 'shadow' });

  icon_group.appendChild(circle_shadow);
  icon_group.appendChild(circle);

  let symbol = createSVGElement("use");
  setAttributes(symbol, {
    'x': center.x - icon_size / 2,
    'y': center.y - icon_size / 2,
    'width': icon_size,
    'height': icon_size });

  symbol.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + serv.icon);
  icon_group.appendChild(symbol);

  group.appendChild(icon_group);

  let text = createSVGElement("text");
  setAttributes(text, {
    x: center.x,
    y: center.y + circle_radius + text_top_margin });


  let tspan = createSVGElement("tspan");
  if (serv.name.indexOf('\n') >= 0) {

    let tspan2 = tspan.cloneNode();
    let name = serv.name.split('\n');
    jQuery(tspan).text(name[0]);
    jQuery(tspan2).text(name[1]);

    setAttributes(tspan2, {
      x: center.x,
      dy: tspan_delta });


    text.appendChild(tspan);
    text.appendChild(tspan2);
  } else
  {
    jQuery(tspan).text(serv.name);
    text.appendChild(tspan);
  }

  group.appendChild(text);
  services.appendChild(group);

  let service_bubble = jQuery(".serv-" + index);

  //Uses tween to look for right position
  twn_pivot_path.seek(index);
  TweenLite.set(service_bubble, {
    x: pivot_path.x,
    y: pivot_path.y,
    transformOrigin: "center center" });


  service_bubble.click(serviceClick);
}

//Creates pointer
function createPointer() {
  let service_pointer = createSVGElement("circle");

  setAttributes(service_pointer, {
    cx: center.x - pointer_dist,
    cy: center.y,
    r: 12,
    class: "pointer" });


  nav_container.appendChild(service_pointer);

  service_pointer = document.querySelector("svg .pointer");

  let pointer_circle = [
  { x: 0, y: 0 },
  { x: pointer_dist, y: pointer_dist },
  { x: pointer_dist * 2, y: 0 },
  { x: pointer_dist, y: -pointer_dist },
  { x: 0, y: 0 }];


  twn_pointer_path.to(service_pointer, pointer_time, {
    bezier: {
      values: pointer_circle,
      curviness: 1.5 },
    ease: Power0.easeNone,
    transformOrigin: "center center" });


}

//Defines behavior for service bubbles
function serviceClick(ev) {

  //There's always an active service
  jQuery(".service.active").removeClass("active");

  let current = jQuery(ev.currentTarget);
  current.addClass("active");

  //There's a "serv-*" class for each bubble
  let current_class = current.attr("class").split(" ")[1];
  let class_index = current_class.split('-')[1];

  //Hides current text of the main bubble
  jQuery(use_copy).addClass("changing");

  //Sets pointer to the right position
  twn_pointer_path.tweenTo(class_index * (pointer_time / (2 * 6)));

  //After it's completely hidden, the text changes and becomes visible
  setTimeout(() => {
    let viewBoxY = 300 * class_index;
    symbol_copy.setAttribute("viewBox", "0 " + viewBoxY + " 300 300");
    jQuery(use_copy).removeClass("changing");
  }, 250);
}

//Array describes points for a whole circle in order to get
//the right curve
let half_circle = [
{ x: -serv_dist, y: 0 },
{ x: 0, y: serv_dist },
{ x: serv_dist, y: 0 },
{ x: 0, y: -serv_dist },
{ x: -serv_dist, y: 0 }];


//A simple object is used in the tween to retrieve its values
var pivot_path = { x: half_circle[0].x, y: half_circle[0].y };

//The object is animated with a duration based on how many bubbles
//should be placed
var twn_pivot_path = TweenMax.to(pivot_path, 12, {
  bezier: {
    values: half_circle,
    curviness: 1.5 },

  ease: Linear.easeNone });


services_data.reduce((count, serv) => {
  addService(serv, count);
  return ++count;
}, 0);

//The variable is modified inside the function
//but its also used later to toggle its class
var twn_pointer_path = new TimelineMax({ paused: true });
createPointer();

//Adding it immediately triggers a bug for the transform
setTimeout(() => jQuery("#service-collection .serv-0").addClass("active"), 200);
document.getElementById("learn-more").addEventListener("click", function () {
  const url = this.getAttribute("data-url");
  window.location.href = url; // Navighează către URL-ul specificat
});

document.querySelector(".learn-more-text").addEventListener("click", function () {
  const url = document.getElementById("learn-more").getAttribute("data-url");
  window.location.href = url; // Navighează către URL-ul specificat
});

const supportItems = [
  { name: "Responsive Design", icon: "responsive-design-icon", description: "Ensure your website looks great on all devices. With responsive design, your site adapts to any screen size, offering a seamless experience for all users.", benefit: "Attract more customers by ensuring your site is accessible and easy to navigate on mobile, tablet, and desktop." },
  { name: "Custom Features", icon: "custom-features-icon", description: "Tailor your website to your specific needs with custom features. Whether it's integrating a unique payment system or a custom user dashboard, we've got you covered.", benefit: "Boost functionality and differentiate your business with a tailored user experience." },
  { name: "SEO Optimization", icon: "seo-optimization-icon", description: "Get found on search engines by optimizing your site for keywords and rankings. SEO ensures your website appears in relevant searches, bringing organic traffic.", benefit: "Increase your website's visibility, driving more traffic and potential leads." },
  { name: "Website Maintenance", icon: "website-maintenance-icon", description: "Ongoing maintenance ensures your website runs smoothly with regular updates and security checks.", benefit: "Keep your website running efficiently, avoiding downtime and keeping your audience engaged." },
  { name: "UI/UX Design", icon: "uiux-design-icon", description: "Craft visually appealing and intuitive interfaces that enhance user experience. UI/UX design focuses on usability, ensuring your users have a smooth and enjoyable experience.", benefit: "Improve user engagement and conversion rates with an optimized and user-friendly design." },
  { name: "Web Development", icon: "web-development-icon", description: "Develop robust and scalable web applications using the latest technologies. From frontend to backend, we build websites that perform and scale with your business.", benefit: "Ensure long-term reliability and performance with a solid web development foundation." },
  { name: "Web Consultation", icon: "web-consultation-icon", description: "Receive expert advice on how to improve your web presence. From technical audits to growth strategies, we offer solutions tailored to your business goals.", benefit: "Align your web strategy with business goals, improving outcomes and maximizing ROI." }
];

function renderSupportItems() {
  const supportContainer = document.querySelector('.support-container');

  supportItems.forEach(item => {
      const supportElement = document.createElement('div');
      supportElement.classList.add('support');

      supportElement.innerHTML = `
          <div class="support-header">
              <div class="icon ${item.icon}"></div>
              <h2>${item.name}</h2>
          </div>
          <p>${item.description}</p>
          <strong>Benefit: ${item.benefit}</strong>
      `;

      supportContainer.appendChild(supportElement);
  });
}

// Function to trigger animations on scroll
function animateOnScroll() {
  const supportSections = document.querySelectorAll('.support');
  supportSections.forEach(section => {
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (sectionPosition < screenPosition) {
          section.classList.add('visible');
      }
  });
}

// Render the support items on page load
document.addEventListener('DOMContentLoaded', renderSupportItems);

// Trigger animation on scroll
window.addEventListener('scroll', animateOnScroll);
