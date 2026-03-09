import { NextRequest } from "next/server";

export const runtime = "nodejs";

const BACKEND_URL = process.env.BACKEND_URL || "http://13.127.153.218/api";

async function handler(
    req: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;
    const { searchParams } = new URL(req.url);

    const pathString = path.join("/").replace(/\/$/, "");

    const url = `${BACKEND_URL}/${pathString}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    // 1) Safely read the exact raw binary of the request (works perfectly for multipart/form-data)
    const body =
        req.method !== "GET" && req.method !== "HEAD"
            ? await req.blob()
            : undefined;

    // 2) Only forward headers that actually exist
    const headers: Record<string, string> = {};
    const contentType = req.headers.get("content-type");
    if (contentType) headers["content-type"] = contentType;

    const cookie = req.headers.get("cookie");
    if (cookie) headers["cookie"] = cookie;

    const auth = req.headers.get("authorization");
    if (auth) headers["authorization"] = auth;
    console.log("🔁 PROXY FORWARDING:");
    console.log("➡️ Incoming API:", req.url);
    console.log("🎯 Forwarding To Backend:", url);
    console.log("🍪 Cookies:", req.headers.get("cookie"));
    const backendRes = await fetch(url, {
        method: req.method,
        headers,
        body,
        cache: "no-store",
        // duplex: "half" is only needed if body is a stream, but we are sending a Buffer
    });

    const data = await backendRes.text();

    const responseHeaders = new Headers();
    backendRes.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();

        // 🔥 Skip problematic hop-by-hop / auto-managed headers
        if (
            lowerKey === "content-length" ||
            lowerKey === "transfer-encoding" ||
            lowerKey === "connection" ||
            lowerKey === "content-encoding"
        ) {
            return;
        }

        if (lowerKey === "set-cookie") {
            responseHeaders.append("set-cookie", value);
        } else {
            responseHeaders.set(key, value);
        }
    });

    return new Response(data, {
        status: backendRes.status,
        headers: responseHeaders,
    });
}

export {
    handler as GET,
    handler as POST,
    handler as PUT,
    handler as PATCH,
    handler as DELETE,
};
