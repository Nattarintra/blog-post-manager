import "./style.css"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
   <h1>Blog post manager</h1>
    <section class="form">
    <form class="add-todo-form">
      <label for="title-input">Add new post</label>
      <input class="new-post-title" id="title-input" required type="text">
      <button class="add-btn" type="submit">Add</button>
    </form>  
    </section>
  </main>
`
