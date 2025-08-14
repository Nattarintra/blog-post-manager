import { filterTemplate } from "./html/filtersTemplate"
import { formTemplate } from "./html/formTemplate"
import "./style.css"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
  <main>
      <section aria-label="Post filter tools" class="toolbar card" id="filter-section"></section>
      <section aria-labelledby="create-post-title" class="card" id="create-new-post"></section>
      <section aria-labelledby="posts-title" class="card" id="show-posts"></section>
  </main>
  `
document.querySelector("#filter-section")!.innerHTML = filterTemplate()
document.querySelector("#create-new-post")!.innerHTML = formTemplate()
//document.querySelector("#show-posts")!.innerHTML = showPost()
// will continue here with show dummy post
