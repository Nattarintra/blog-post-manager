import type { IPost } from "./types"

export const dummyPosts: IPost[] = [
  {
    id: 1,
    title: "Getting Started with TypeScript",
    content: "TypeScript is a superset of JavaScript that adds static typing, helping you write safer and more maintainable code.",
    author: "Natta",
    createdAt: "2025-08-14T09:15:00Z"
  },
  {
    id: 2,
    title: "Managing the DOM with Vanilla JS",
    content: "Even with many frameworks available, understanding the basic DOM API is essential for web development.",
    author: "John",
    createdAt: "2025-08-13T14:30:00Z"
  },
  {
    id: 3,
    title: "How to Use LocalStorage",
    content: "LocalStorage lets you store key-value pairs in the browser that persist even after closing the browser.",
    author: "Ananya",
    createdAt: "2025-08-12T18:45:00Z"
  },
  {
    id: 4,
    title: "Event Listener Management Tips",
    content: "Event delegation can help reduce the number of event listeners and improve performance.",
    author: "Michael",
    createdAt: "2025-08-11T11:20:00Z"
  },
  {
    id: 5,
    title: "Intro to Responsive CSS",
    content: "Responsive design ensures that your website looks great on both mobile and desktop devices.",
    author: "Kanya",
    createdAt: "2025-08-10T07:50:00Z"
  }
]
