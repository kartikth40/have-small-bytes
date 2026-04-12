# Have Small Bytes

A full-stack blog platform covering Web Development, DSA, and Personal Development - built with Next.js 13 App Router, Hygraph (GraphQL CMS), and NextAuth.js.

<img width="1556" height="755" alt="image" src="https://github.com/user-attachments/assets/3b3dd683-4889-47bb-8107-08c4d3b04cb2" />

**Live:** [havesmallbytes.vercel.app](https://havesmallbytes.vercel.app/)

## Screenshots

<details>
<summary>Home Page (Dark & Light)</summary>
<br>

<img width="1556" height="755" alt="image" src="https://github.com/user-attachments/assets/3b3dd683-4889-47bb-8107-08c4d3b04cb2" />
<img width="1556" height="783" alt="image" src="https://github.com/user-attachments/assets/92a73f97-d4b4-45ad-9f9c-fbcf97b12497" />
<img width="1556" height="693" alt="image" src="https://github.com/user-attachments/assets/f775f902-47df-4626-971f-a04efd47b99b" />

</details>

<details>
<summary>Post Page</summary>
<br>

<img width="1556" height="782" alt="image" src="https://github.com/user-attachments/assets/6e6a6dec-3fda-47fc-bb7b-af9e804693ae" />
<img width="1556" height="783" alt="image" src="https://github.com/user-attachments/assets/3700482e-8939-4f1d-8893-1b71626342c6" />

</details>

<details>
<summary>Comments & Replies</summary>
<br>

<img width="1556" height="779" alt="image" src="https://github.com/user-attachments/assets/68535db2-04e3-46eb-a471-f7636dd3f405" />

</details>

<details>
<summary>Notifications</summary>
<br>

<img width="1556" height="357" alt="image" src="https://github.com/user-attachments/assets/274edc2d-1c52-4fde-aa55-572762c3894b" />

</details>

<details>
<summary>Sign Up/Log In - Inline Validation & 404 page</summary>
<br>

<img width="1556" height="722" alt="image" src="https://github.com/user-attachments/assets/85d0f38e-58b9-4d0a-8e98-7b71cc2335c7" />
<img width="1556" height="731" alt="image" src="https://github.com/user-attachments/assets/b1897c81-7fd5-4586-8773-67691e98eec0" />
<img width="1556" height="731" alt="image" src="https://github.com/user-attachments/assets/3683a138-f5e3-4ec3-b07f-6485e012ebc6" />
<img width="1556" height="732" alt="image" src="https://github.com/user-attachments/assets/d9ff66a2-0df7-46d1-8d13-08062b0426ff" />

</details>

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
