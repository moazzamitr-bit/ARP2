import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";

const root = process.cwd();
const appOutput = join(root, ".next/server/app");
const dist = join(root, "dist");
const client = join(dist, "client");
const server = join(dist, "server");
const githubPagesBasePath = process.env.GITHUB_PAGES === "true" ? "/ARP2" : "";
const pages = new Map();
const referencedPublicAssets = new Set();

async function exists(path) {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
}

function pageTarget(source) {
  const rel = relative(appOutput, source);
  if (rel === "index.html") {
    return join(client, "index.html");
  }
  return join(client, rel.replace(/\.html$/, "/index.html"));
}

function pageRoute(source) {
  const rel = relative(appOutput, source).replace(/\.html$/, "");
  if (rel === "index") return "/";
  if (rel === "_not-found") return "/404";
  return `/${rel}`;
}

function rewriteImageOptimizerUrls(html) {
  return html.replace(/(?:\/[^/"']+)?\/_next\/image\?url=([^&"']+)&amp;w=\d+&amp;q=\d+/g, (_, encodedUrl) => {
    return decodeURIComponent(encodedUrl);
  });
}

function prefixGithubPagesPublicUrls(text) {
  if (!githubPagesBasePath) {
    return text;
  }

  return text
    .replace(/(?<![\w:-])\/(assets|catalogues)\//g, `${githubPagesBasePath}/$1/`)
    .replace(/(?<![\w:-])\/(robots\.txt|sitemap\.xml)/g, `${githubPagesBasePath}/$1`);
}

async function walk(dir, visitor) {
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(path, visitor);
        return;
      }
      await visitor(path);
    }),
  );
}

async function collectPublicAssetReferences(dir) {
  await walk(dir, async (source) => {
    if (![".ts", ".tsx", ".css", ".mjs"].includes(extname(source))) {
      return;
    }

    const text = await readFile(source, "utf8");
    for (const match of text.matchAll(/["'`](\/(?:assets|catalogues)\/[^"'`?#\s)]+)/g)) {
      referencedPublicAssets.add(match[1]);
    }
  });
}

async function pruneUnreferencedPublicAssets(dir) {
  await walk(dir, async (source) => {
    const publicUrl = `/${relative(client, source).replaceAll("\\", "/")}`;
    if (!referencedPublicAssets.has(publicUrl)) {
      await rm(source, { force: true });
    }
  });
}

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await mkdir(join(dist, ".openai"), { recursive: true });
await writeFile(join(client, ".nojekyll"), "");

await cp(join(root, ".next/static"), join(client, "_next/static"), { recursive: true });
await cp(join(root, ".openai/hosting.json"), join(dist, ".openai/hosting.json"));

if (await exists(join(root, "public/assets/images/hero-sports-distribution.png"))) {
  await cp(join(root, "public"), client, { recursive: true });
  await rm(join(client, "catalogues/cosco-catalogue.pdf"), { force: true });
  await Promise.all([
    collectPublicAssetReferences(join(root, "app")),
    collectPublicAssetReferences(join(root, "components")),
    collectPublicAssetReferences(join(root, "content")),
  ]);
  await pruneUnreferencedPublicAssets(join(client, "assets"));
  await pruneUnreferencedPublicAssets(join(client, "catalogues"));
}

await walk(appOutput, async (source) => {
  const extension = extname(source);

  if (extension === ".html") {
    const target = pageTarget(source);
    const html = rewriteImageOptimizerUrls(await readFile(source, "utf8"));
    pages.set(pageRoute(source), html);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html);
  }

  if (source.endsWith(".txt.body") || source.endsWith(".xml.body")) {
    const rel = relative(appOutput, source).replace(/\.body$/, "");
    const target = join(client, rel);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, await readFile(source));
  }
});

await walk(client, async (source) => {
  const extension = extname(source);

  if (![".html", ".js", ".css", ".xml", ".txt"].includes(extension)) {
    return;
  }

  const current = await readFile(source, "utf8");
  const updated = prefixGithubPagesPublicUrls(current);

  if (updated !== current) {
    await writeFile(source, updated);
  }
});

const workerSource = `const PAGES = new Map(${JSON.stringify([...pages.entries()])});

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function htmlResponse(html, init = {}) {
  return new Response(html, {
    ...init,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
      ...(init.headers || {}),
    },
  });
}

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init.headers || {}),
    },
  });
}

function routeFor(pathname) {
  if (pathname === "/index.html") return "/";
  if (pathname.endsWith("/index.html")) return pathname.slice(0, -"/index.html".length) || "/";
  return pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
}

async function staticAsset(request, env) {
  if (!env?.ASSETS?.fetch) return null;
  const response = await env.ASSETS.fetch(request);
  return response.status === 404 ? null : response;
}

export default {
  async fetch(request, env = {}) {
    const url = new URL(request.url);
    const route = routeFor(url.pathname);

    if (route === "/api/forms/contact" || route === "/api/forms/reseller") {
      if (request.method !== "POST") {
        return jsonResponse({ error: "Method not allowed" }, { status: 405, headers: { allow: "POST" } });
      }
      return jsonResponse({ ok: true, message: "Preview submission received." });
    }

    if (route.startsWith("/_next/") || route.startsWith("/assets/") || route.startsWith("/catalogues/") || route === "/robots.txt" || route === "/sitemap.xml") {
      const asset = await staticAsset(request, env);
      if (asset) return asset;
    }

    const html = PAGES.get(route);
    if (html) return htmlResponse(html);

    const asset = await staticAsset(request, env);
    if (asset) return asset;

    return htmlResponse(PAGES.get("/404") || "Not found", { status: 404 });
  },
};
`;

await writeFile(join(server, "index.js"), workerSource);
