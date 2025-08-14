export const filterTemplate = (): string => {
  return /*html */ `
    <div class="toolbar-row">
          <label for="sort">Sort by</label>
          <select id="sort" name="sort">
            <option value="newest" selected>Newest</option>
            <option value="author">Author (A→Z)</option>
          </select>
        </div>
        <div class="toolbar-row">
          <label for="filter">Author</label>
          <input id="filter" name="filter" type="text" placeholder="type author name..." />
        </div>
  `
}
