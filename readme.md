# Have Small Bytes

A full-stack blog platform covering Web Development, DSA, and Personal Development - built with Next.js 13 App Router, Hygraph (GraphQL CMS), and NextAuth.js.

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

<!-- paste dark mode home screenshot here -->
<!-- paste light mode home screenshot here -->

</details>

<details>
<summary>Post Page</summary>
<br>

<!-- paste post page screenshot here (markdown rendering + syntax highlighted code block + like button) -->

</details>

<details>
<summary>Comments & Replies</summary>
<br>

<!-- paste comment section screenshot here (nested replies open, edit/delete dropdown visible) -->

</details>

<details>
<summary>Notifications</summary>
<br>

<!-- paste notifications page screenshot here (unread indicators visible) -->

</details>

<details>
<summary>Sign Up - Inline Validation</summary>
<br>

<!-- paste sign up page screenshot here (real-time validation checkmarks visible) -->

</details>
