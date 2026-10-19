# Hamrah Panel

پنل شخصی‌سازی‌شده‌ی ساخت اشتراک (VLESS / Trojan / Warp) روی Cloudflare Workers، با تم تیره و پروفایل‌های اپراتور ایران.

> مبتنی بر [BPB Worker Panel](https://github.com/bia-pain-bache/BPB-Worker-Panel) نوشته‌ی bia-pain-bache، تحت مجوز **GPL-3.0**. فایل `LICENSE` و این ذکر منبع باید حفظ شود و کد تغییریافته هم باید با همین مجوز منتشر شود.

## تفاوت‌ها با نسخه‌ی اصلی
- نام و ظاهر جدید (تم کهربایی، فونت وزیرمتن، لوگوی جدید)
- پروفایل اپراتور روی آدرس اشتراک: `?app=xray&isp=mci|irancell|tci|rightel`
- بازنویسی fragment packet: `&packets=1-1` (وقتی `tlshello` روی اپراتوری کار نمی‌کند)
- پایداری بیشتر worker: در خطای اتصال مستقیم تا ۳ پروکسی/prefix مختلف امتحان می‌شود
- دکمه‌ی Update داخل پنل از همین مخزن (Releases) آپدیت می‌گیرد

## ساخت
1. مخزن را روی گیت‌هاب خودت بساز (`siralinamdarbinanc-byte/Hamrah-Panel`) و این فایل‌ها را push کن.
2. در تب Actions، workflow با نام **Build and Release** را اجرا کن (`workflow_dispatch`). فایل `worker.js` در Releases ساخته می‌شود.

## نصب (مهم)
این نسخه فقط با Wizard نصب می‌شود (نصب دستی کار نمی‌کند). Wizard رسمی را بگیر، ولی قبل از اجرا فایل `worker.js` کنار برنامه را با فایل `worker.js` از Releases **همین مخزن** عوض کن. از آن به بعد دکمه‌ی Update پنل هم از مخزن خودت می‌خواند.

```bash
# مثال (لینوکس/Termux): بعد از نصب Wizard
curl -fsSL -o ~/bpb-wizard/worker.js \
  https://github.com/siralinamdarbinanc-byte/Hamrah-Panel/releases/latest/download/worker.js
```
(مسیر پوشه‌ی نصب Wizard را با مسیر واقعی عوض کن.)

## توسعه
```bash
npm install
npm run check   # type check
npm run build   # خروجی: dist/worker.js
```
