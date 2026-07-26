/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Our local placeholder SVGs (monogram, photo frame) need this to run
    // through next/image's optimizer like any other asset in /public. Only
    // ever serving our own trusted, checked-in SVGs here (never user- or
    // remote-supplied), so the usual SVG/XSS caveat for this flag doesn't
    // apply; the CSP below still sandboxes it as defense in depth.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
