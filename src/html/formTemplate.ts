export const formTemplate = (): string => {
  return /*html */ `
   <h1 id="create-post-title">Blog post manager</h1>
    <form id="post-form">
      <div class="field">
        <label for="title">Title</label>
        <input id="title" name="title" type="text" required />
      </div>
      <div class="field">
        <label for="author">Author</label>
        <input id="author" name="author" type="text" required />
      </div>
      <div class="field">
        <label for="content">content</label>
        <textarea id="content" name="content" rows="4" required></textarea>
      </div>
      <button type="submit" class="btn primary">
        Add
      </button>
    </form>
  `
}
