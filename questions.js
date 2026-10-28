// ============================================================================
// OUTLIER.AI HTML & CSS MASTER QUESTION BANK
// ============================================================================

window.QUESTION_BANK = {
  // --------------------------------------------------------------------------
  // PHASE 1: TYPING & MEMORY DRILLS (Przepisujesz odpowiedź po angielsku)
  // Uczymy się kluczowych fraz, definicji i kodu, których wymaga Outlier.
  // --------------------------------------------------------------------------
  typingDrills: [
    {
      id: "td-1",
      category: "HTML Semantics",
      question: "What is the key semantic difference between the <strong> and <b> tags in HTML5?",
      targetAnswer: "<strong> indicates strong importance, seriousness, or urgency, while <b> is purely stylistic bold text without extra importance.",
      plHint: "Chodzi o to, że <strong> nadaje ważność semantyczną (dla czytników ekranu), a <b> to tylko wizualne pogrubienie.",
      keywords: ["strong importance", "urgency", "purely stylistic", "without extra importance"]
    },
    {
      id: "td-2",
      category: "HTML Semantics",
      question: "What is the difference between <em> and <i> in HTML5?",
      targetAnswer: "<em> adds semantic stress emphasis that changes the meaning of a sentence, whereas <i> represents text in an alternate voice or mood.",
      plHint: "<em> to nacisk semantyczny (emfaza), a <i> to tylko kursywa (np. termin techniczny, obcy zwrot).",
      keywords: ["semantic stress emphasis", "alternate voice"]
    },
    {
      id: "td-3",
      category: "HTML Semantics",
      question: "When should you use <article> instead of <section>?",
      targetAnswer: "Use <article> for self-contained, independent content that can be distributed or reused standalone, and <section> for thematic grouping of content.",
      plHint: "<article> to samodzielna całość (np. post, karta produktu), a <section> to tematyczny rozdział strony.",
      keywords: ["self-contained", "independent", "thematic grouping"]
    },
    {
      id: "td-4",
      category: "Accessibility (a11y)",
      question: "How do you make an icon-only button accessible to screen readers?",
      targetAnswer: "Add an aria-label attribute to the <button> element to provide an accessible text description of its action.",
      plHint: "Gdy przycisk nie ma tekstu (tylko ikonę), dodajemy atrybut aria-label opisujący akcję.",
      keywords: ["aria-label", "accessible text description"]
    },
    {
      id: "td-5",
      category: "Accessibility (a11y)",
      question: "How do you explicitly associate a <label> with an <input> element?",
      targetAnswer: "Set the for attribute of the <label> to match the exact id attribute of the <input> element.",
      plHint: "Atrybut 'for' w <label> musi być dokładnie taki sam jak atrybut 'id' (nie 'name'!) w <input>.",
      keywords: ["for attribute", "id attribute"]
    },
    {
      id: "td-6",
      category: "Accessibility (a11y)",
      question: "What should the alt attribute of a purely decorative <img> be set to?",
      targetAnswer: "It should be set to an empty string (alt=\"\") so screen readers ignore the decorative image.",
      plHint: "Obrazki czysto dekoracyjne muszą mieć pusty alt=\"\" (nie wolno całkiem pomijać atrybutu alt!).",
      keywords: ["empty string", "alt=\"\"", "screen readers ignore"]
    },
    {
      id: "td-7",
      category: "CSS Box Model",
      question: "How does box-sizing: border-box change the calculation of an element's width and height?",
      targetAnswer: "box-sizing: border-box includes padding and border inside the element's declared width and height instead of adding them outside.",
      plHint: "Z border-box padding i border wliczają się DO środka zadeklarowanego width/height, a nie powiększają pudełka.",
      keywords: ["box-sizing: border-box", "includes padding and border", "declared width"]
    },
    {
      id: "td-8",
      category: "CSS Specificity",
      question: "List the CSS specificity hierarchy from highest weight to lowest weight.",
      targetAnswer: "Inline styles have the highest specificity, followed by ID selectors, then classes, attributes, and pseudo-classes, and finally element and pseudo-element selectors.",
      plHint: "Kolejność wag: Inline style (1000) > ID (100) > Klasy/Atrybuty/Pseudoklasy (10) > Znaczniki/Pseudoelementy (1).",
      keywords: ["Inline styles", "ID selectors", "classes", "element"]
    },
    {
      id: "td-9",
      category: "CSS Positioning",
      question: "Relative to what is an element with position: absolute positioned?",
      targetAnswer: "An element with position: absolute is positioned relative to its nearest positioned ancestor (any ancestor with position other than static).",
      plHint: "Najczęstsza pułapka! Nie względem rodzica, tylko względem najbliższego przodka z position innym niż static.",
      keywords: ["nearest positioned ancestor", "other than static"]
    },
    {
      id: "td-10",
      category: "Flexbox & Grid",
      question: "What is the fundamental difference between CSS Flexbox and CSS Grid?",
      targetAnswer: "Flexbox is designed for one-dimensional layouts (either a row or a column), whereas CSS Grid is designed for two-dimensional layouts (both rows and columns simultaneously).",
      plHint: "Flexbox jest jednowymiarowy (1D: wiersz LUB kolumna), a Grid dwuwymiarowy (2D: wiersze I kolumny naraz).",
      keywords: ["one-dimensional", "two-dimensional", "rows and columns"]
    },
    {
      id: "td-11",
      category: "Flexbox & Grid",
      question: "Write the exact CSS declarations to perfectly center a child element both horizontally and vertically using Flexbox.",
      targetAnswer: "display: flex; justify-content: center; align-items: center;",
      plHint: "Klasyczne 3 linijki kodu, które trzeba umieć wpisać z zamkniętymi oczami.",
      keywords: ["display: flex", "justify-content: center", "align-items: center"]
    },
    {
      id: "td-12",
      category: "Responsive Design",
      question: "What is the difference between em and rem units in CSS?",
      targetAnswer: "rem is always relative to the root <html> element's font-size, while em is relative to the font-size of the element's parent (or the element itself for properties like padding).",
      plHint: "rem = względem głównego znacznika <html>; em = względem rodzica (co powoduje efekt mnożenia przy zagnieżdżeniach).",
      keywords: ["root <html>", "font-size", "parent"]
    },
    {
      id: "td-13",
      category: "HTML Forms & Media",
      question: "Which HTML attribute defers loading of off-screen images until the user scrolls near them?",
      targetAnswer: "loading=\"lazy\"",
      plHint: "Atrybut leniwego ładowania obrazków w HTML5.",
      keywords: ["loading=\"lazy\""]
    },
    {
      id: "td-14",
      category: "Responsive Design",
      question: "Write a mobile-first CSS media query that applies styles when the viewport width is at least 768 pixels.",
      targetAnswer: "@media (min-width: 768px) { }",
      plHint: "W podejściu mobile-first używamy min-width (od 768px w górę).",
      keywords: ["@media", "min-width: 768px"]
    },
    {
      id: "td-15",
      category: "Accessibility (a11y)",
      question: "Why is it bad practice to remove the focus outline (outline: none) without providing an alternative style?",
      targetAnswer: "Removing the focus outline makes it impossible for keyboard-only users to see which interactive element is currently focused, violating WCAG accessibility standards.",
      plHint: "Użytkownicy poruszający się klawiaturą (Tab) nie widzą wtedy, na którym elemencie się znajdują.",
      keywords: ["keyboard-only users", "focused", "accessibility"]
    }
  ],

  // --------------------------------------------------------------------------
  // PHASE 2: UNTIMED ABCD QUESTIONS (Spokojny trening wyboru A, B, C, D)
  // --------------------------------------------------------------------------
  abcdUntimed: [
    {
      id: "u-1",
      category: "HTML Semantics",
      question: "Which HTML5 element is most appropriate for wrapping a standalone blog post comment that could be syndicated independently?",
      code: null,
      options: [
        "<section>",
        "<article>",
        "<aside>",
        "<details>"
      ],
      correctIndex: 1,
      explanation: "`<article>` is specified for self-contained compositions (blog posts, product cards, user comments). According to the HTML5 spec, even individual comments inside an article should use nested `<article>` tags."
    },
    {
      id: "u-2",
      category: "HTML Semantics",
      question: "What is the primary purpose of the `<b>` element in modern HTML5?",
      code: null,
      options: [
        "To indicate that the text has strong importance or urgency for screen readers.",
        "To draw attention to text for utilitarian purposes without conveying any extra importance or emphasis.",
        "To mark text that has been newly inserted into a document.",
        "It is deprecated in HTML5 and fails W3C validation."
      ],
      correctIndex: 1,
      explanation: "In HTML5, `<b>` was redefined as the 'Bring Attention To' element: it styles text bold without conveying extra semantic importance (unlike `<strong>`)."
    },
    {
      id: "u-3",
      category: "Accessibility (a11y)",
      question: "Which code snippet properly associates the label with the input field so clicking the label focuses the input?",
      code: null,
      options: [
        "<label for=\"username\">Username</label>\n<input type=\"text\" name=\"username\">",
        "<label id=\"user-id\">Username</label>\n<input type=\"text\" for=\"user-id\">",
        "<label for=\"user-id\">Username</label>\n<input type=\"text\" id=\"user-id\" name=\"username\">",
        "<label target=\"user-id\">Username</label>\n<input type=\"text\" id=\"user-id\">"
      ],
      correctIndex: 2,
      explanation: "The `<label>`'s `for` attribute must match the `<input>`'s `id` attribute (not `name`)."
    },
    {
      id: "u-4",
      category: "HTML Forms & Media",
      question: "Which HTML5 input attribute prevents a form from submitting unless the value matches a specific regular expression?",
      code: null,
      options: [
        "regex",
        "validate",
        "pattern",
        "format"
      ],
      correctIndex: 2,
      explanation: "The `pattern` attribute specifies a regular expression that the `<input>` element's value is checked against on form submission."
    },
    {
      id: "u-5",
      category: "CSS Box Model",
      question: "Given the following CSS, what is the total rendered width (border-box width / offsetWidth) of `.box`?",
      code: ".box {\n  width: 300px;\n  padding: 15px 20px;\n  border: 5px solid #000;\n  margin: 10px;\n}",
      options: [
        "300px",
        "350px",
        "370px",
        "340px"
      ],
      correctIndex: 1,
      explanation: "Default `box-sizing` is `content-box`. Total rendered box width = `width` (300px) + left/right `padding` (20px + 20px) + left/right `border` (5px + 5px) = 350px. Note: `padding: 15px 20px` means 15px top/bottom and 20px left/right. Margin (10px) is outside the box itself."
    },
    {
      id: "u-6",
      category: "CSS Box Model",
      question: "If we add `box-sizing: border-box;` to the `.box` in the previous snippet (`width: 300px; padding: 15px 20px; border: 5px solid #000;`), what becomes the width of the inner content area?",
      code: ".box {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 15px 20px;\n  border: 5px solid #000;\n}",
      options: [
        "300px",
        "250px",
        "260px",
        "350px"
      ],
      correctIndex: 1,
      explanation: "With `border-box`, the total box width stays 300px. The inner content area shrinks by horizontal padding (20+20=40px) and horizontal border (5+5=10px): 300 - 40 - 10 = 250px."
    },
    {
      id: "u-7",
      category: "CSS Specificity",
      question: "Which of the following selectors has the HIGHEST specificity?",
      code: null,
      options: [
        "div.container ul li a:hover",
        "#main-nav .menu-item",
        ".header .nav .list .item .link.active",
        "body header nav ul li a::after"
      ],
      correctIndex: 1,
      explanation: "`#main-nav .menu-item` has 1 ID + 1 class = (0, 1, 1, 0) = 110. Even 6 classes `.header .nav .list .item .link.active` is (0, 0, 6, 0) = 60, which never beats a single ID selector."
    },
    {
      id: "u-8",
      category: "CSS Positioning",
      question: "What happens when an element is given `position: relative; top: 20px; left: 10px;`?",
      code: null,
      options: [
        "It is removed from normal document flow and positioned relative to the viewport.",
        "It shifts 20px down and 10px right from its normal position, while the original space it occupied in the document flow is preserved.",
        "It shifts 20px up and 10px left, causing sibling elements to collapse into its space.",
        "It sticks to the top of the screen when scrolling past 20px."
      ],
      correctIndex: 1,
      explanation: "`position: relative` keeps the element in the normal document flow (its original space remains reserved) and offsets it visually relative to where it would normally sit."
    },
    {
      id: "u-9",
      category: "Flexbox & Grid",
      question: "In a Flex container with `flex-direction: column;`, which property aligns flex items horizontally (left/center/right)?",
      code: ".container {\n  display: flex;\n  flex-direction: column;\n}",
      options: [
        "justify-content",
        "align-items",
        "flex-wrap",
        "vertical-align"
      ],
      correctIndex: 1,
      explanation: "When `flex-direction: column` is set, the main axis is vertical (`justify-content`) and the cross axis becomes horizontal (`align-items`). Therefore, `align-items` controls horizontal alignment!"
    },
    {
      id: "u-10",
      category: "Flexbox & Grid",
      question: "What do the three values in the shorthand property `flex: 1 0 200px;` represent in order?",
      code: null,
      options: [
        "flex-basis, flex-grow, flex-shrink",
        "flex-grow, flex-shrink, flex-basis",
        "flex-shrink, flex-grow, flex-basis",
        "flex-order, flex-grow, flex-width"
      ],
      correctIndex: 1,
      explanation: "The `flex` shorthand always follows the order: `flex-grow` (1), `flex-shrink` (0), `flex-basis` (200px)."
    },
    {
      id: "u-11",
      category: "CSS Selectors",
      question: "What does the CSS selector `h2 + p` select?",
      code: null,
      options: [
        "All `<p>` elements that are inside an `<h2>` element.",
        "All `<p>` elements that follow an `<h2>` anywhere inside the same parent.",
        "Only the single `<p>` element that immediately follows an `<h2>` element as its next sibling.",
        "Both `<h2>` and `<p>` elements."
      ],
      correctIndex: 2,
      explanation: "The `+` combinator is the Adjacent Sibling selector: it selects only the element that comes immediately after the former element and shares the same parent."
    },
    {
      id: "u-12",
      category: "Responsive Design",
      question: "If `html { font-size: 16px; }`, `.parent { font-size: 1.5em; }`, and `.child { font-size: 2em; }` (where `.child` is inside `.parent`), what is the computed `font-size` of `.child` in pixels?",
      code: "html { font-size: 16px; }\n.parent { font-size: 1.5em; }\n.child { font-size: 2em; }",
      options: [
        "32px",
        "24px",
        "48px",
        "16px"
      ],
      correctIndex: 2,
      explanation: "`em` compounds with nesting! `.parent` is `1.5 * 16px = 24px`. `.child` is `2em` relative to `.parent`: `2 * 24px = 48px`. (If `.child` had used `2rem`, it would be `32px`)."
    },
    {
      id: "u-13",
      category: "Accessibility (a11y)",
      question: "Which ARIA attribute should be used on a dynamic notification banner so screen readers announce updates automatically without moving the user's focus?",
      code: null,
      options: [
        "aria-hidden=\"true\"",
        "aria-live=\"polite\"",
        "aria-selected=\"true\"",
        "role=\"presentation\""
      ],
      correctIndex: 1,
      explanation: "`aria-live=\"polite\"` (or `\"assertive\"`) creates a live region that screen readers monitor and announce when text changes dynamically."
    },
    {
      id: "u-14",
      category: "HTML Semantics",
      question: "How do you store custom metadata (like a product SKU) directly on a standard HTML element so it validates in HTML5 and can be read via `element.dataset` in JS?",
      code: null,
      options: [
        "<div sku=\"A123\">",
        "<div meta-sku=\"A123\">",
        "<div data-product-sku=\"A123\">",
        "<div aria-sku=\"A123\">"
      ],
      correctIndex: 2,
      explanation: "Custom attributes must use the `data-*` prefix (`data-product-sku`), which is exposed in JavaScript as `element.dataset.productSku`."
    },
    {
      id: "u-15",
      category: "CSS Layout & Display",
      question: "Which statement accurately describes elements with `display: inline` (such as `<span>` or `<a>`)?",
      code: null,
      options: [
        "They always start on a new line and take up the full width available.",
        "Explicit `width`, `height`, and vertical margins (`margin-top`, `margin-bottom`) have no layout effect on them.",
        "They cannot have `padding` or `background-color`.",
        "They behave identically to `display: inline-block`."
      ],
      correctIndex: 1,
      explanation: "On `display: inline` elements, `width` and `height` are ignored, and vertical margins (`margin-top` / `margin-bottom`) do not push surrounding elements away. To set width/height while staying inline, use `display: inline-block`."
    }
  ],

  // --------------------------------------------------------------------------
  // PHASE 3: TIMED HARD QUESTIONS & RLHF MODEL EVALUATION (45-60s licznik!)
  // Prawdziwe pułapki z Outlier.ai: ocenianie kodu AI, trudne kaskady, edge-case'y
  // --------------------------------------------------------------------------
  timedHard: [
    {
      id: "th-1",
      category: "CSS Specificity & Cascade",
      timeLimit: 50,
      question: "What color will the text 'Outlier Assessment' be rendered in?",
      code: "<div id=\"app\" class=\"wrapper\">\n  <p class=\"text highlight\">Outlier Assessment</p>\n</div>\n\n<style>\n  #app p { color: blue; }\n  .wrapper .text.highlight { color: green; }\n  div#app > p.text { color: crimson; }\n  p.text.highlight { color: orange !important; }\n  #app p.highlight { color: purple !important; }\n</style>",
      options: [
        "crimson",
        "orange",
        "purple",
        "blue"
      ],
      correctIndex: 2,
      explanation: "Two rules have `!important`: `p.text.highlight` (specificity 0,0,2,1 = 21) and `#app p.highlight` (specificity 0,1,1,1 = 111). Among `!important` declarations, normal specificity rules still apply! `#app p.highlight` wins, making it `purple`."
    },
    {
      id: "th-2",
      category: "RLHF AI Code Evaluation",
      timeLimit: 60,
      question: "[RLHF Task] A user asks an AI to create an accessible navigation bar with a search form. Which AI Model response follows HTML5 and WCAG best practices?",
      code: "<!-- Model A -->\n<div class=\"nav\">\n  <a href=\"/\">Home</a>\n  <input type=\"text\" placeholder=\"Search...\">\n  <div class=\"btn\" onclick=\"submit()\">🔍</div>\n</div>\n\n<!-- Model B -->\n<nav aria-label=\"Main Navigation\">\n  <a href=\"/\">Home</a>\n  <form role=\"search\">\n    <label for=\"q\" class=\"sr-only\">Search site</label>\n    <input id=\"q\" type=\"search\" name=\"q\" placeholder=\"Search...\">\n    <button type=\"submit\" aria-label=\"Submit search\">🔍</button>\n  </form>\n</nav>",
      options: [
        "Model A is better because it is more concise and avoids unnecessary DOM nodes.",
        "Model B is better because it uses semantic <nav>, <form>, <button>, associates a <label> with the input, and provides aria-label for the icon button.",
        "Both models are equally valid in modern browsers because placeholders replace labels.",
        "Model A is better, except it should use <span> instead of <div> for the button."
      ],
      correctIndex: 1,
      explanation: "In Outlier RLHF tasks, always penalize `div` buttons (`<div onclick>` lacks keyboard focus and Enter/Space activation) and missing `<label>` elements (`placeholder` is NOT a valid accessible replacement for `<label>`)."
    },
    {
      id: "th-3",
      category: "CSS Box Model & Margin Collapse",
      timeLimit: 50,
      question: "Two stacked block elements sit inside a normal block container. `.box-top` has `margin-bottom: 30px;` and `.box-bottom` has `margin-top: 20px;`. What is the vertical distance between their borders?",
      code: "<div class=\"box-top\">Top</div>\n<div class=\"box-bottom\">Bottom</div>\n\n<style>\n  .box-top { margin-bottom: 30px; }\n  .box-bottom { margin-top: 20px; }\n</style>",
      options: [
        "50px",
        "30px",
        "20px",
        "10px"
      ],
      correctIndex: 1,
      explanation: "Vertical margins between adjacent block-level siblings collapse (Margin Collapsing)! Instead of adding up (30+20=50px), the browser takes the larger of the two margins: `30px`. (Note: Margins do NOT collapse in Flexbox or Grid containers!)."
    },
    {
      id: "th-4",
      category: "Flexbox & Grid",
      timeLimit: 45,
      question: "In CSS Grid, what does the declaration `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` achieve?",
      code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}",
      options: [
        "It creates a fixed 200px single-column layout on all screen sizes.",
        "It creates a responsive grid where columns automatically wrap and stretch to fill available space without media queries, never shrinking below 200px.",
        "It causes syntax error because `auto-fit` cannot be combined with `1fr`.",
        "It creates exactly two columns: one 200px wide and one taking the remaining space."
      ],
      correctIndex: 1,
      explanation: "This is the most famous modern CSS Grid pattern: `repeat(auto-fit, minmax(200px, 1fr))` automatically fits as many columns of at least 200px as possible into the row and distributes leftover space equally (`1fr`)."
    },
    {
      id: "th-5",
      category: "CSS Positioning & Stacking",
      timeLimit: 50,
      question: "Why is `.tooltip { z-index: 9999; }` NOT having any effect in the snippet below?",
      code: ".tooltip {\n  z-index: 9999;\n  background: black;\n  color: white;\n}",
      options: [
        "`z-index` maximum valid value in CSS is 1000.",
        "`z-index` only works on positioned elements (e.g., `position: relative`, `absolute`, `fixed`, `sticky`) or flex/grid children, not on default `position: static`.",
        "`z-index` requires `display: block` to be explicitly declared.",
        "`z-index` cannot be used on elements with a background color."
      ],
      correctIndex: 1,
      explanation: "By default, elements have `position: static`. On a `static` element (that is not a direct child of a flex/grid container), `z-index` is completely ignored!"
    },
    {
      id: "th-6",
      category: "CSS Selectors",
      timeLimit: 50,
      question: "Given the HTML list below, which items will turn RED?",
      code: "<ul>\n  <li>Item 1</li>\n  <li class=\"skip\">Item 2</li>\n  <li>Item 3</li>\n  <li>Item 4</li>\n</ul>\n\n<style>\n  li:nth-child(2n):not(.skip) {\n    color: red;\n  }\n</style>",
      options: [
        "Item 2 and Item 4",
        "Item 4 only",
        "Item 1 and Item 3",
        "Item 3 only"
      ],
      correctIndex: 1,
      explanation: "`li:nth-child(2n)` targets even items (Item 2 and Item 4). `:not(.skip)` excludes Item 2 because it has `class=\"skip\"`. Therefore, only **Item 4** turns red!"
    },
    {
      id: "th-7",
      category: "RLHF AI Code Evaluation",
      timeLimit: 60,
      question: "[RLHF Task] An AI generated the CSS below to create a smooth hover transition on a card. Why is this implementation problematic for performance, and how should it be fixed?",
      code: ".card {\n  top: 0;\n  left: 0;\n  transition: all 0.3s ease;\n}\n.card:hover {\n  top: -10px;\n  width: 320px;\n}",
      options: [
        "Animating `top` and `width` triggers expensive browser layout recalculations (reflows) on every frame; it should animate `transform: translateY(-10px) scale(...)` and `opacity` instead.",
        "The `transition` property must be placed inside `.card:hover`, not `.card`.",
        "`ease` is not a valid timing function in CSS3.",
        "CSS transitions require `@keyframes` to work on `:hover`."
      ],
      correctIndex: 0,
      explanation: "High-scoring Outlier reviews note that animating geometric properties (`top`, `left`, `width`, `height`) triggers Layout/Reflow on the main thread. Animating `transform` and `opacity` runs on the GPU compositor thread at 60fps."
    },
    {
      id: "th-8",
      category: "HTML Semantics & SEO",
      timeLimit: 45,
      question: "When embedding an external link with `target=\"_blank\"`, why is `rel=\"noopener noreferrer\"` recommended?",
      code: "<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">External</a>",
      options: [
        "It makes the link open in a popup window instead of a tab.",
        "It prevents the newly opened page from accessing `window.opener` (preventing tabnabbing security attacks) and hides referrer header info.",
        "It forces search engines to index the external page faster.",
        "It disables CSS styling on visited links."
      ],
      correctIndex: 1,
      explanation: "`noopener` prevents the external site from hijacking the original tab via `window.opener.location` (reverse tabnabbing), and `noreferrer` omits the `Referer` HTTP header."
    },
    {
      id: "th-9",
      category: "CSS Pseudo-elements",
      timeLimit: 45,
      question: "Why will the `::before` pseudo-element below FAIL to render on screen?",
      code: ".badge::before {\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  background: green;\n  border-radius: 50%;\n}",
      options: [
        "Pseudo-elements cannot have `border-radius`.",
        "It is missing the required `content` property (e.g., `content: \"\";`).",
        "It uses double colons `::before` instead of a single colon `:before`.",
        "`display: inline-block` is invalid on `::before`."
      ],
      correctIndex: 1,
      explanation: "Both `::before` and `::after` will NEVER render unless the `content` property is specified (even if empty: `content: \"\";`). This is a classic Outlier debugging question!"
    },
    {
      id: "th-10",
      category: "Responsive Design",
      timeLimit: 45,
      question: "What happens if an HTML document lacks `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` on a mobile phone?",
      code: null,
      options: [
        "The page refuses to load on iOS and Android browsers.",
        "Mobile browsers render the page inside a virtual desktop viewport (typically ~980px wide) and shrink it down, preventing mobile media queries from triggering properly.",
        "All CSS stylesheets are ignored on mobile devices.",
        "Images are automatically deleted to save mobile data."
      ],
      correctIndex: 1,
      explanation: "Without the viewport meta tag, mobile browsers assume the site is a desktop site, rendering it at ~980px width and zooming out, which breaks `@media (max-width: 768px)` rules."
    },
    {
      id: "th-11",
      category: "CSS Specificity & Cascade",
      timeLimit: 45,
      question: "What is the specificity weight of the `:where()` pseudo-class compared to `:is()`?",
      code: ":where(header, footer) p { color: red; }\n:is(header, footer) p { color: blue; }",
      options: [
        "Both have the exact same specificity.",
        "`:where()` always has 0 specificity, whereas `:is()` takes the specificity of its most specific argument.",
        "`:where()` has higher specificity than ID selectors.",
        "`:is()` is only valid in JavaScript `querySelector`."
      ],
      correctIndex: 1,
      explanation: "Modern CSS trivia loved by test makers: `:where()` always has ZERO specificity (making it easy to override), while `:is()` takes the specificity weight of its highest argument."
    },
    {
      id: "th-12",
      category: "HTML Forms & Media",
      timeLimit: 45,
      question: "Inside a `<form>`, what is the default `type` of a `<button>` element if no `type` attribute is specified?",
      code: "<form action=\"/save\">\n  <button>Cancel</button>\n</form>",
      options: [
        "type=\"button\"",
        "type=\"submit\"",
        "type=\"reset\"",
        "type=\"none\""
      ],
      correctIndex: 1,
      explanation: "Another huge trap! A `<button>` inside a `<form>` defaults to `type=\"submit\"`! Clicking 'Cancel' above will accidentally submit the form unless you explicitly write `<button type=\"button\">Cancel</button>`."
    }
  ],

  // --------------------------------------------------------------------------
  // PHASE 4: SPOKEN / VIDEO & WRITTEN OPEN-ENDED PROMPTS
  // Symulator pytań wideo / audio / pisemnych z automatyczną oceną słów kluczowych
  // --------------------------------------------------------------------------
  videoPrompts: [
    {
      id: "vp-1",
      category: "Accessibility (a11y) & Semantic HTML",
      timeLimit: 75,
      prompt: "Explain why semantic HTML is essential for Web Accessibility (a11y) and SEO. Give at least 3 concrete examples of semantic tags and explain what goes wrong when a developer uses only <div> and <span> elements.",
      plGuide: "Opowiedz (lub napisz) po angielsku: 1) Czym jest semantyczny HTML (znaczniki niosące znaczenie o swojej zawartości), 2) Wymień np. <nav>, <main>, <article>, <button>, 3) Wyjaśnij, że czytniki ekranu (screen readers) i nawigacja klawiaturą polegają na tych znacznikach (landmarks, focus), a <div onclick> nie działa z klawiaturą (Tab/Enter) bez dodatkowego kodu ARIA i tabindex.",
      requiredKeywords: [
        { word: "screen reader", label: "screen readers (czytniki ekranu)" },
        { word: "keyboard", label: "keyboard navigation / focus" },
        { word: "seo", label: "SEO / search engines" },
        { word: "button", label: "<button> vs <div>" },
        { word: "nav", label: "<nav> / <main> / <article> landmarks" }
      ],
      modelScript: "Semantic HTML uses tags that clearly describe their meaning and purpose—such as <header>, <nav>, <main>, <article>, and <button>—rather than generic <div> and <span> containers. First, for Web Accessibility, assistive technologies like screen readers rely on semantic landmarks to let users jump directly to the main content or navigation. Furthermore, interactive elements like <button> provide built-in keyboard accessibility—they are focusable with the Tab key and can be activated with Enter or Space, which a plain <div> lacks. Second, for SEO, search engine crawlers use semantic hierarchy to understand the structure and importance of page content."
    },
    {
      id: "vp-2",
      category: "Accessibility (a11y) - Forms & ARIA",
      timeLimit: 75,
      prompt: "A junior developer built a form using only placeholder attributes instead of <label> tags, removed focus outlines with `outline: none`, and used a <div> with an SVG icon as the submit button. As an AI Code Reviewer on Outlier, explain the accessibility issues and how to fix them.",
      plGuide: "Wypunktuj 3 błędy a11y: 1) Placeholder znika podczas pisania i nie zastępuje <label for='id'> dla czytników ekranu, 2) outline: none psuje nawigację klawiaturą (użyj :focus-visible), 3) <div onclick> nie ma fokusu ani roli przycisku – zamień na <button type='submit' aria-label='...'>.",
      requiredKeywords: [
        { word: "label", label: "<label> with for/id" },
        { word: "placeholder", label: "placeholder disappears / not a label" },
        { word: "focus", label: "focus outline / :focus-visible" },
        { word: "button", label: "native <button>" },
        { word: "aria-label", label: "aria-label for icon button" }
      ],
      modelScript: "There are three critical WCAG accessibility issues in this code. First, placeholders disappear as soon as the user starts typing and are not a substitute for labels; every input must have an explicit <label> linked via matching 'for' and 'id' attributes. Second, removing the focus indicator with 'outline: none' makes keyboard navigation impossible because users cannot see which element is active; instead, we should style ':focus-visible'. Third, using a <div> as a submit button breaks keyboard submission and screen reader announcements; it must be replaced with a native <button type='submit'> and given an 'aria-label' since it only contains an icon."
    },
    {
      id: "vp-3",
      category: "CSS Layout: Flexbox vs Grid",
      timeLimit: 60,
      prompt: "Compare CSS Flexbox and CSS Grid. When would you choose one over the other in a real-world interface, and how do they work together?",
      plGuide: "Wyjaśnij: Flexbox = 1D (jednowymiarowy: wiersz LUB kolumna, świetny do paska nawigacji, wyrównania elementów w karcie). Grid = 2D (dwuwymiarowy: wiersze I kolumny naraz, świetny do głównego układu strony lub galerii kart). Można je łączyć (Grid dla strony, Flexbox wewnątrz kart).",
      requiredKeywords: [
        { word: "one-dimensional", label: "one-dimensional / 1D (Flexbox)" },
        { word: "two-dimensional", label: "two-dimensional / 2D (Grid)" },
        { word: "row", label: "rows and columns" },
        { word: "justify-content", label: "alignment (justify-content / align-items)" }
      ],
      modelScript: "The main difference is that CSS Flexbox is designed for one-dimensional layouts—handling either a single row or a single column at a time—while CSS Grid is designed for two-dimensional layouts, controlling both rows and columns simultaneously. I use CSS Grid for macro page layouts or responsive card galleries using 'grid-template-columns', and I use Flexbox for micro-components like navigation bars, button groups, or centering items inside a card with 'justify-content' and 'align-items'. In practice, they work best together: a Grid item can itself be a Flex container."
    },
    {
      id: "vp-4",
      category: "CSS Box Model & Specificity",
      timeLimit: 60,
      prompt: "Explain the CSS Box Model and why developers almost universally apply `box-sizing: border-box` in a CSS reset. Also briefly explain how CSS Specificity resolves conflicting rules.",
      plGuide: "1) Wymień 4 warstwy Box Modelu: content, padding, border, margin. 2) Wyjaśnij, że domyślny content-box dodaje padding i border do szerokości (psując layout), a border-box trzyma je wewnątrz width. 3) Wymień hierarchię specyficzności: inline > ID > class > element.",
      requiredKeywords: [
        { word: "padding", label: "content, padding, border, margin" },
        { word: "border-box", label: "box-sizing: border-box" },
        { word: "content-box", label: "default content-box" },
        { word: "specificity", label: "specificity hierarchy (ID > class > element)" }
      ],
      modelScript: "Every element in CSS is represented as a rectangular box consisting of four layers: the inner content area, padding, border, and outer margin. By default, CSS uses 'box-sizing: content-box', where adding padding or borders increases the element's total rendered width beyond its declared width, often causing unexpected overflow. Setting 'box-sizing: border-box' includes padding and border inside the declared width, making responsive layouts predictable. When multiple CSS rules conflict, the browser calculates specificity: inline styles win over ID selectors, which beat classes and pseudo-classes, which beat element selectors."
    },
    {
      id: "vp-5",
      category: "Accessibility (a11y) - Images, Contrast & Modals",
      timeLimit: 75,
      prompt: "How should images (informative vs. decorative) and modal dialogs be implemented in HTML/CSS to meet WCAG Accessibility guidelines?",
      plGuide: "1) Obrazki informacyjne potrzebują opisowego atrybutu alt, a dekoracyjne pustego alt=\"\" (żeby czytnik je pominął). 2) Okno modalne (<dialog> lub role=\"dialog\" aria-modal=\"true\") musi zatrzymywać fokus klawiatury wewnątrz (focus trap) i zamykać się klawiszem Escape.",
      requiredKeywords: [
        { word: "alt", label: "alt attribute (descriptive vs empty alt=\"\")" },
        { word: "decorative", label: "decorative images ignored" },
        { word: "dialog", label: "<dialog> or role=\"dialog\"" },
        { word: "focus", label: "focus trap / keyboard Escape" }
      ],
      modelScript: "For images, informative images must have a concise, descriptive 'alt' attribute explaining their content, whereas purely decorative images must have an empty 'alt=\"\"' attribute so screen readers skip them entirely. For modal dialogs, we should use the native HTML5 '<dialog>' element or 'role=\"dialog\"' with 'aria-modal=\"true\"'. Crucially, a modal must trap keyboard focus inside itself while open, allow closing via the Escape key, and return focus to the trigger button when closed."
    },
    {
      id: "vp-6",
      category: "Responsive Design & Mobile-First CSS",
      timeLimit: 65,
      prompt: "Explain what 'Mobile-First' responsive design means in CSS, how `min-width` media queries work, and why relative units (`rem`, `vw`, `%`) are preferred over fixed pixels (`px`).",
      plGuide: "1) Mobile-first = piszemy bazowy CSS dla małych ekranów (telefonów), a potem dodajemy @media (min-width: 768px) dla większych ekranów. 2) Jednostki względne (rem, %) skalują się z ustawieniami wielkości czcionki użytkownika w przeglądarce (ważne dla osób słabowidzących!).",
      requiredKeywords: [
        { word: "mobile-first", label: "mobile-first base styles" },
        { word: "min-width", label: "@media (min-width: ...)" },
        { word: "rem", label: "relative units (rem / % / vw)" },
        { word: "zoom", label: "browser font scaling / zoom accessibility" }
      ],
      modelScript: "Mobile-first design means writing base CSS rules for small mobile screens first without media queries, and then progressively enhancing the layout for larger screens using '@media (min-width: ...)' breakpoints. Furthermore, using relative units like 'rem' instead of hardcoded pixels ('px') is critical for accessibility because 'rem' scales proportionally when a visually impaired user increases their browser's default font size or zoom level."
    }
  ],

  // --------------------------------------------------------------------------
  // CODE RECALL / WRITE CODE FROM MEMORY (Część egzaminu, gdzie wpisujesz kod)
  // --------------------------------------------------------------------------
  codeRecall: [
    {
      id: "cr-1",
      category: "CSS Box Model",
      timeLimit: 45,
      prompt: "Write the universal CSS reset rule (using the `*` selector) that sets all elements to include padding and borders within their declared width and height.",
      expectedSnippet: "* { box-sizing: border-box; }",
      mustContain: ["box-sizing", "border-box"],
      explanation: "The standard reset is `* { box-sizing: border-box; }`."
    },
    {
      id: "cr-2",
      category: "Accessibility (a11y)",
      timeLimit: 60,
      prompt: "Write an HTML `<button>` of type `button` that displays only an `X` character visually, but announces 'Close modal' to screen readers.",
      expectedSnippet: "<button type=\"button\" aria-label=\"Close modal\">X</button>",
      mustContain: ["<button", "aria-label", "Close modal", "</button>"],
      explanation: "Use `<button type=\"button\" aria-label=\"Close modal\">X</button>`."
    },
    {
      id: "cr-3",
      category: "Responsive Design",
      timeLimit: 60,
      prompt: "Write a CSS media query for screens with a maximum width of 600px that hides an element with the class `.sidebar`.",
      expectedSnippet: "@media (max-width: 600px) { .sidebar { display: none; } }",
      mustContain: ["@media", "max-width", "600px", ".sidebar", "display", "none"],
      explanation: "Use `@media (max-width: 600px) { .sidebar { display: none; } }`."
    },
    {
      id: "cr-4",
      category: "Accessibility (a11y)",
      timeLimit: 55,
      prompt: "Write an HTML `<label>` and `<input type=\"email\">` pair properly linked together using the ID `user-email`.",
      expectedSnippet: "<label for=\"user-email\">Email</label><input type=\"email\" id=\"user-email\">",
      mustContain: ["<label", "for=\"user-email\"", "<input", "id=\"user-email\""],
      explanation: "The `<label for=\"user-email\">` must match `<input id=\"user-email\">`."
    },
    {
      id: "cr-5",
      category: "Flexbox & Grid",
      timeLimit: 55,
      prompt: "Write CSS rules for `.container` to make it a Flex container and center its children both horizontally and vertically.",
      expectedSnippet: ".container { display: flex; justify-content: center; align-items: center; }",
      mustContain: ["display: flex", "justify-content: center", "align-items: center"],
      explanation: "Use `display: flex; justify-content: center; align-items: center;`."
    }
  ]
};
