import "./style.css"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
  <main>
   <h1>Blog post manager</h1>
    <section class="form">
    <form class="add-todo-form">
      <label for="title-input">Title</label>
      <input class="new-post-title" id="title-input" required type="text">
      <label for="author-input">Author</label>
      <input class="new-post-title" id="title-input" type="text">
      <label for="content-input">Content</label>
      <textarea class="new-post-title" id="context-input" required type="text"> </textarea>
      <button class="add-btn" type="submit">Add</button>
    </form>  
    </section>
  </main>
`
