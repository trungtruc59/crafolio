# Tổng hợp source Crafolio

Tài liệu này tổng hợp những gì hiện có trong source dự án `crafolio` sau khi đọc toàn bộ phần source chính, cấu hình, route, model, auth, i18n và UI. Dự án đang dùng Next.js `16.2.9`, nên các quy ước được hiểu theo App Router, Route Handlers và `proxy.ts` của Next 16.

## 1. Tổng quan dự án

`Crafolio` là nền tảng tạo portfolio cá nhân cho creator/developer, định hướng no-code/drag-and-drop. Source hiện tại đang ở giai đoạn nền móng: đã có cấu trúc Next.js App Router, layout public/auth, đăng ký/đăng nhập, NextAuth, MongoDB/Mongoose, i18n bằng `next-intl`, schema validation bằng Zod và một số type cho portfolio builder.

## 2. Công nghệ chính

- Framework: Next.js `16.2.9` với App Router trong `src/app`.
- React: React `19.2.4`.
- Auth: `next-auth` v5 beta, credentials provider và Google provider.
- Database: MongoDB qua `mongoose`.
- Validation: `zod`.
- Password hashing: `bcryptjs`.
- i18n: `next-intl`.
- Styling: Tailwind CSS v4 qua `@tailwindcss/postcss`.
- UI/helper: `clsx`, `tailwind-merge`, `lucide-react`, `framer-motion`, `react-rnd`, `zustand`.

## 3. Cấu trúc routing

Theo guide Next 16 đã đọc, folder trong `app` tạo route segment, route group trong ngoặc không xuất hiện trên URL, `route.ts` là Route Handler, và `proxy.ts` thay thế tên gọi Middleware.

Các route hiện có:

- `/`: trang public home tại `src/app/(public)/page.tsx`.
- `/login`: trang đăng nhập tại `src/app/(auth)/login/page.tsx`.
- `/register`: trang đăng ký tại `src/app/(auth)/register/page.tsx`.
- `/dashboard`: trang dashboard đơn giản tại `src/app/(public)/dashboard/page.tsx`.
- `/portfolio/[slug]`: đã tạo file route động nhưng chưa có nội dung.
- `/api/auth/[...nextauth]`: NextAuth handler.
- `/api/auth/register`: API đăng ký tài khoản.
- `/api/settings/i18n`: API trả về thiết lập ngôn ngữ.
- `/api/test`: API test kết nối MongoDB.

## 4. Layout và giao diện

- `src/app/layout.tsx` là root layout, load Geist fonts, metadata, global CSS và bọc app bằng `NextIntlClientProvider`.
- `src/app/(public)/layout.tsx` bọc các route public bằng `PublicHeader` và `PublicFooter`.
- `src/app/(auth)/layout.tsx` tạo khung form auth căn giữa màn hình.
- `PublicHeader` có logo, nav links, nút login/register và nút menu mobile dạng tĩnh.
- `PublicFooter` có nhóm link Product/Company/Resources và copyright.
- `Container` là component wrapper max-width dùng chung.
- `LanguageSwitcher` và `PublicLayout` đã tồn tại nhưng đang rỗng.

## 5. Auth đã triển khai

Auth tập trung ở `src/auth.ts`:

- Dùng `NextAuth` với session strategy là JWT.
- Credentials provider nhận `email` và `password`.
- Khi đăng nhập credentials:
  - Kết nối MongoDB.
  - Tìm user theo email lowercase.
  - Lấy password bằng `.select("+password")`.
  - So khớp bằng `bcryptjs`.
  - Trả về `id`, `name`, `email`, `role`, `image`.
- Google provider đã khai báo qua `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET`.
- JWT callback gắn `role` vào token.
- Session callback gắn `id` và `role` vào `session.user`.
- Trang sign-in custom là `/login`.

Các type mở rộng NextAuth nằm ở `src/types/next-auth.d.ts`, bổ sung `role`, `id` cho session/user/JWT.

## 6. Đăng ký tài khoản

Luồng đăng ký gồm UI và API:

- `src/components/auth/registerForm.tsx` là client component:
  - Nhập name/email/password/confirmPassword.
  - Gọi `POST /api/auth/register`.
  - Hiển thị lỗi field từ API.
  - Nếu thành công thì tự `signIn("credentials")`.
  - Có nút đăng nhập Google.
- `src/app/api/auth/register/route.ts` xử lý:
  - Parse body JSON.
  - Validate bằng `registerSchema` trong `src/lib/validations/auth.schema.ts`.
  - Check email đã tồn tại.
  - Hash password.
  - Tạo user role `user`, provider `credentials`, `emailVerified: false`.
  - Trả response chuẩn qua `successResponse`/`errorResponse`.

## 7. Đăng nhập

- `src/components/auth/loginForm.tsx` là client component:
  - Nhập email/password.
  - Gọi `signIn("credentials", { redirect: false })`.
  - Nếu lỗi hiển thị `auth.invalidCredentials`.
  - Nếu thành công chuyển về `/`.
  - Có nút đăng nhập Google với callback `/dashboard`.

## 8. Bảo vệ route

`src/proxy.ts` dùng `auth` của NextAuth để bảo vệ các đường dẫn:

- Matcher: `/dashboard/:path*`, `/editor/:path*`, `/admin/:path*`.
- Nếu chưa đăng nhập thì redirect `/login`.
- Nếu vào `/admin` mà role không phải `admin` thì redirect `/dashboard`.
- Nếu hợp lệ thì `NextResponse.next()`.

Theo guide Next 16, file này dùng đúng tên `proxy.ts`; Next 16 đổi cách gọi Middleware thành Proxy.

## 9. Database và model

Kết nối DB:

- `src/lib/db.ts` dùng Mongoose.
- Có cache connection bằng `global.mongooseCache` để tránh reconnect nhiều lần.
- DB name đang cố định là `crafolio`.
- Biến môi trường cần có: `MONGODB_URI`.

Model hiện có:

- `src/models/User.ts`
  - Fields: `name`, `email`, `password`, `role`, `avatar`, `authProvider`, `googleId`, `emailVerified`.
  - Collection: `users`.
  - Email unique/index/lowercase.
  - Password mặc định `select: false`.
- `src/models/SystemSetting.ts`
  - Fields: `key`, `defaultLocale`, `enabledLocales`.
  - Collection: `system_settings`.
  - Dùng cho cấu hình i18n.
- `src/models/Portfolio.ts`
  - File đã có nhưng chưa triển khai.

## 10. i18n

i18n đang dùng `next-intl`:

- `src/i18n/routing.ts` định nghĩa locales `vi`, `en`, default `vi`.
- `src/i18n/request.ts` đọc cookie `NEXT_LOCALE`.
- Nếu cookie hợp lệ thì dùng locale đó, nếu không thì fallback `vi`.
- Message files:
  - `src/messages/en.json`
  - `src/messages/vi.json`
- `src/lib/settings/i18n-setting.ts` lấy setting từ MongoDB, nếu chưa có thì tạo mặc định:
  - `defaultLocale: "vi"`
  - `enabledLocales: ["vi"]`
- `src/app/api/settings/i18n/route.ts` trả về setting i18n.

## 11. API response và validation

- `src/lib/api-response.ts` chuẩn hoá JSON response:
  - `successResponse`: `{ success: true, code, messageKey, data }`.
  - `errorResponse`: `{ success: false, code, messageKey, errors }`.
- `src/lib/validations/auth.schema.ts`:
  - `registerSchema`: name 2-80 ký tự, email hợp lệ, password tối thiểu 8 ký tự, confirm password phải khớp.
  - `loginSchema`: email hợp lệ, password bắt buộc.
- `src/lib/validations/settings.schema.ts`:
  - Validate default/enabled locales.
  - Bắt buộc default locale phải nằm trong enabled locales.
- `src/features/auth/register.schema.ts` cũng có register schema riêng, nhưng hiện không thấy được dùng trong API chính.

## 12. Helper và type

- `src/lib/password.ts`: hash/compare password bằng bcrypt.
- `src/lib/auth.ts`: helper ký và verify JWT custom bằng `jsonwebtoken`, hiện chưa thấy được dùng trong auth flow chính.
- `src/lib/cookies.ts`: khai báo `AUTH_COOKIE_NAME = "crafolio_token"`, hiện chưa thấy được dùng.
- `src/lib/session.ts`: wrapper `getServerSession(authOptions)`.
- `src/lib/utils.ts`:
  - `cn()` merge class bằng `clsx` + `tailwind-merge`.
  - `generateSlug()` tạo slug từ text.
- `src/types/portfolio.ts`:
  - Định nghĩa component portfolio gồm `text`, `image`, `button`, `menu`.
  - Có animation type, canvas config và `PortfolioData`.

## 13. Styling

- `src/app/globals.css` import Tailwind v4 và khai báo theme variables.
- Có dark-mode variables dựa trên `prefers-color-scheme`.
- `src/app/reset.css` có CSS reset riêng nhưng hiện chưa được import trong root layout.
- UI hiện dùng utility classes Tailwind trực tiếp trong component.

## 14. Cấu hình

- `next.config.ts` tích hợp plugin `next-intl` với request config `./src/i18n/request.ts`.
- `eslint.config.mjs` dùng `eslint-config-next/core-web-vitals` và TypeScript config.
- `postcss.config.mjs` dùng `@tailwindcss/postcss`.
- `tsconfig.json` bật strict mode, App Router typegen include `.next/types`, alias `@/*` trỏ vào `src/*`.

## 15. Những phần đã có nhưng còn dang dở

- Portfolio builder mới có type, chưa có model Mongoose, editor UI hoặc render public portfolio.
- `/portfolio/[slug]` rỗng.
- `LanguageSwitcher` rỗng, chưa có UI đổi `NEXT_LOCALE`.
- `PublicLayout` rỗng, trong khi route public đang dùng trực tiếp layout trong `app`.
- Header mobile button chưa có menu logic.
- Google provider mới cấu hình provider, chưa thấy logic tạo/link user Google trong DB.
- `src/lib/session.ts` import `authOptions` từ `@/auth`, nhưng `src/auth.ts` hiện không export `authOptions`; đây có thể gây lỗi nếu file này được import.
- `src/app/(public)/dashboard/page.tsx` cũng import `authOptions` từ `@/auth`; tương tự có nguy cơ lỗi build.
- `common.loading` đang được dùng trong login/register form nhưng chưa có trong `en.json`/`vi.json`.
- `vi.json` đang bị mojibake/encoding lỗi hiển thị tiếng Việt.
- Root layout đang hardcode `<html lang="en">` dù default locale là `vi`.
- `src/lib/db.ts` đang log `MONGODB_URI` ra console và phần check thiếu env bị comment; nên tránh log secret trong môi trường thật.
- `/api/test` cũng log `MONGODB_URI`; chỉ nên dùng dev/debug.
- Có hai register schema khác nhau: `src/lib/validations/auth.schema.ts` và `src/features/auth/register.schema.ts`.

## 16. Luồng chạy chính

1. Người dùng mở app.
2. Root layout load message theo cookie `NEXT_LOCALE`.
3. Route public hiển thị header/footer.
4. Người dùng đăng ký qua `/register`.
5. Form gọi `/api/auth/register`.
6. API validate, tạo user trong MongoDB và trả message key.
7. Form tự đăng nhập lại bằng credentials.
8. NextAuth cấp JWT session.
9. Khi vào `/dashboard`, `proxy.ts` kiểm tra session.
10. Nếu không có session redirect `/login`, nếu có thì cho qua.

## 17. Biến môi trường cần thiết

Các biến được source tham chiếu:

- `MONGODB_URI`: kết nối MongoDB.
- `GOOGLE_CLIENT_ID`: OAuth Google.
- `GOOGLE_CLIENT_SECRET`: OAuth Google.
- `JWT_SECRET`: dùng bởi helper JWT custom trong `src/lib/auth.ts`.
- Các biến chuẩn của NextAuth như `AUTH_SECRET`/URL có thể cần tuỳ môi trường chạy NextAuth v5.

## 18. Kết luận trạng thái hiện tại

Crafolio hiện đã có nền tảng tốt cho một app portfolio SaaS nhỏ: routing, layout, auth credentials, đăng ký, DB models cơ bản, i18n và cấu trúc helper đã được dựng. Phần cần ưu tiên tiếp theo là sửa lỗi build liên quan `authOptions`, bổ sung message thiếu, sửa encoding tiếng Việt, hoàn thiện language switcher, rồi mới mở rộng sang portfolio model/editor/render.
