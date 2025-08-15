import { filterTemplate } from "./html/filtersTemplate"
import { formTemplate } from "./html/formTemplate"
import { loadPosts, savePosts } from "./storage"
import "./style.css"
import type { IPost } from "./types"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
  <main>
      <section aria-label="Post filter tools" class="toolbar card" id="filter-section"></section>
      <section aria-labelledby="create-post-title" class="card" id="create-new-post"></section>
      <section aria-labelledby="posts-title" class="card" id="show-posts"></section>
  </main>
  `
document.querySelector("#filter-section")!.innerHTML = filterTemplate()
document.querySelector("#create-new-post")!.innerHTML = formTemplate()

let posts: IPost[] = loadPosts()
let editingId: string | number | null = null

const formEl = document.querySelector<HTMLFormElement>("#create-new-post form")!
formEl.addEventListener("submit", e => {
  e.preventDefault()
  const fd = new FormData(formEl)
  const title = ((fd.get("title") as string) || "").trim()
  const author = ((fd.get("author") as string) || "").trim()
  const content = ((fd.get("content") as string) || "").trim()

  if (!title || !content) return

  const newPost: IPost = {
    id: crypto.randomUUID?.(),
    title,
    content,
    author: author || undefined,
    createdAt: new Date().toISOString()
  }

  posts.unshift(newPost) // 1) เพิ่มใน state (บนสุด)
  savePosts(posts) // 2) เซฟลง localStorage
  renderPosts(posts) // 3) อัปเดตลิสต์บนหน้า
  formEl.reset() // 4) ล้างฟอร์ม
  ;(formEl.querySelector('[name="title"]') as HTMLInputElement)?.focus()
})

// ---------- Edit/Delete/Save/Cancel ----------
const listHost = document.querySelector<HTMLDivElement>("#show-posts")!

listHost.addEventListener("click", e => {
  const el = e.target as HTMLElement
  const btn = el.closest<HTMLButtonElement>("button[data-action]")
  if (!btn) return

  const action = btn.dataset.action!
  const id = btn.dataset.id!
  const idStr = String(id)

  if (action === "edit") {
    editingId = idStr
    renderPosts(posts)
    // Focus title when edit
    requestAnimationFrame(() => {
      document.querySelector<HTMLInputElement>('article[data-id="' + idStr + '"] input[name="title"]')?.focus()
    })
    return
  }

  if (action === "cancel") {
    editingId = null
    renderPosts(posts)
    return
  }

  if (action === "save") {
    const card = btn.closest<HTMLElement>("article[data-id]")
    if (!card) return
    const title = (card.querySelector<HTMLInputElement>('input[name="title"]')?.value ?? "").trim()
    const author = (card.querySelector<HTMLInputElement>('input[name="author"]')?.value ?? "").trim()
    const content = (card.querySelector<HTMLTextAreaElement>('textarea[name="content"]')?.value ?? "").trim()
    if (!title || !content) {
      // TODO: แจ้งเตือนผู้ใช้ให้กรอกให้ครบ
      return
    }

    posts = posts.map(p => (String(p.id) === idStr ? { ...p, title, author: author || undefined, content } : p))
    savePosts(posts)
    editingId = null
    renderPosts(posts)
    return
  }

  if (action === "delete") {
    if (!confirm("Confirm delete?")) return
    posts = posts.filter(p => String(p.id) !== idStr)
    savePosts(posts)
    renderPosts(posts)
    return
  }
})
// ---------- Render list ----------
function renderPosts(list: IPost[]) {
  const host = document.querySelector<HTMLDivElement>("#show-posts")!
  host.innerHTML = ""
  host.innerHTML = "<h2> All Post </h2>"

  if (list.length === 0) {
    host.textContent = "Post not found"
    return
  }
  list.forEach(p => {
    const card = document.createElement("article")
    card.dataset.id = String(p.id)

    if (String(p.id) === String(editingId)) {
      // ----- Edit post -----
      card.innerHTML = `
        <div class="field">
          <label>Title</label>
          <input name="title" type="text" value="${p.title}" required />
        </div>
        <div class="field">
          <label>Author</label>
          <input name="author" type="text" value="${p.author ?? ""}" />
        </div>
        <div class="field">
          <label>Content</label>
          <textarea name="content" rows="4" required>${p.content}</textarea>
        </div>
        <div class="post__actions">
          <button class="btn primary material-symbols-outlined" data-action="save" data-id="${p.id}"> Save</button>
          <button class="btn material-symbols-outlined" data-action="cancel" data-id="${p.id}">↩ Cancel</button>
        </div>
      `
    } else {
      // ----- Show post -----
      const h3 = document.createElement("h3")
      h3.textContent = p.title

      const meta = document.createElement("div")
      meta.className = "muted"
      meta.textContent = `${p.author ?? "Unknown"} • ${new Date(p.createdAt).toLocaleString("sv-SW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })}`

      const body = document.createElement("p")
      body.textContent = p.content

      const actions = document.createElement("div")
      actions.className = "post__actions"

      const editBtn = document.createElement("button")
      editBtn.className = "btn material-symbols-outlined"
      editBtn.dataset.action = "edit"
      editBtn.dataset.id = String(p.id)
      editBtn.textContent = "Edit"

      const delBtn = document.createElement("button")
      delBtn.className = "btn danger material-symbols-outlined"
      delBtn.dataset.action = "delete"
      delBtn.dataset.id = String(p.id)
      delBtn.textContent = "Delete"

      actions.append(editBtn, delBtn)
      card.append(h3, meta, body, actions)
    }

    host.appendChild(card)
  })
}

renderPosts(posts)
