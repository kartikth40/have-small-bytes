# Have Small Bytes

A full-stack blog platform covering Web Development, DSA, and Personal Development - built with Next.js 13 App Router, Hygraph (GraphQL CMS), and NextAuth.js.

<img width="1869" height="991" alt="image" src="https://github.com/user-attachments/assets/310f7515-ca73-477d-9316-7a8264bf9016" />


**Live:** [havesmallbytes.vercel.app](https://havesmallbytes.vercel.app/)

---

## Features

- **Posts & Categories** - Browse posts by Web Dev, DSA, and Personal Development with featured post carousels and infinite scroll pagination
- **Auth System** - Sign up / sign in via email or username, with an OTP-based passwordless password reset flow (bcrypt-hashed OTPs, auto-cleaned after use)
- **Comments & Replies** - Nested comment threads with inline edit/delete, paginated reply loading (5 per page), and real-time reply counts
- **Likes** - Optimistic UI like button with particle animation; rolls back on failure
- **Notifications** - Per-user notification feed for likes, comments, and replies with deep-linking to the exact comment/reply on the post page; auto-deleted after 30 days
- **Reader Profile** - Update username and avatar, reset password, delete account
- **Dark / Light Theme** - System preference detection with manual override; persisted in `localStorage` with a blocking inline script to prevent flash-of-wrong-theme
- **SEO** - Dynamic XML sitemap, per-post Open Graph tags, JSON-LD structured data, and Google Search Console verification

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 13.4 (App Router) |
| Language | TypeScript 5 |
| CMS / Database | Hygraph (GraphQL) |
| Auth | NextAuth.js v4 + custom JWT |
| Styling | SCSS Modules |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel |
| Analytics | Vercel Analytics + Google Analytics |

---

## Architecture Highlights

- **Resilient data layer** - All 50+ GraphQL service functions use React `cache()` for request deduplication and a `retryAPICall` utility that retries up to 5× with 1s backoff on HTTP 429 rate-limit errors
- **ISR** - Post pages revalidate every 60 seconds, keeping content fresh without hitting the CMS on every request
- **Cascading deletes** - Deleting a comment cleans up its replies, reply notifications, and comment notifications in the correct dependency order
- **Deep-linked notifications** - Notification clicks store `commentId`/`replyId` in `localStorage`, navigate to the post, and use `IntersectionObserver` to scroll-to and highlight the target element

---

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env.local` with the following:

```env
NEXT_PUBLIC_HYGRAPH_ENDPOINT=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
JWT_SECRET=
NODEMAILER_EMAIL=
NODEMAILER_PW=
```

---

## Screenshots

<details>
<summary>Home Page (Dark & Light)</summary>
<br>

<img width="1869" height="991" alt="image" src="https://github.com/user-attachments/assets/ec40f1bf-fa10-4449-a3fc-fb8299ca885f" />
<img width="1869" height="991" alt="image" src="https://github.com/user-attachments/assets/b60e7d1d-0666-458c-ad84-7f573ac108d3" />

</details>

<details>
<summary>Post Page</summary>
<br>

<img width="1869" height="991" alt="image" src="https://github.com/user-attachments/assets/92fc7038-b9c8-4a14-bb4b-5dfb100da032" />
<img width="1869" height="991" alt="image" src="https://github.com/user-attachments/assets/dcfa0fe4-58a9-4c8a-8f2f-bfd588a14a28" />

</details>

<details>
<summary>Comments & Replies</summary>
<br>

<img width="1869" height="991" alt="image" src="https://github.com/user-attachments/assets/a02887b4-9cbc-4f5f-9511-5e96153cb4c6" />

</details>

<details>
<summary>Notifications</summary>
<br>

<img width="1859" height="416" alt="image" src="https://github.com/user-attachments/assets/01f2b85f-0d22-4c5d-af2b-98de078748aa" />

</details>

<details>
<summary>Sign Up/Log In - Inline Validation</summary>
<br>

<img width="1869" height="990" alt="image" src="https://github.com/user-attachments/assets/6e3bf84e-d1eb-4049-8c35-19e728efab53" />
<img width="1869" height="990" alt="image" src="https://github.com/user-attachments/assets/8fdc1c85-2294-40a3-b05b-5bb5fc5a46e7" />
<img width="1869" height="990" alt="image" src="https://github.com/user-attachments/assets/ba037dda-978a-4c34-a8cb-f3b694dd7c4e" />

</details>
