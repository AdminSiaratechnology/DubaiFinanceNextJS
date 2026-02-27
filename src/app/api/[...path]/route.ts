import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://13.127.153.218/api";

async function handler(
    req: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;
    const { searchParams } = new URL(req.url);

    const url = `${BACKEND_URL}/${path.join("/")}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    const body =
        req.method !== "GET" && req.method !== "HEAD"
            ? await req.arrayBuffer()
            : undefined;

    const backendRes = await fetch(url, {
        method: req.method,
        headers: {
            "Content-Type": req.headers.get("content-type") || "application/json",
            Cookie: req.headers.get("cookie") || "",
        },
        body,
        credentials: "include",
        cache: "no-store",
    });

    const data = await backendRes.text();

    // 🔥 CRITICAL: Preserve MULTIPLE Set-Cookie headers
    const responseHeaders = new Headers();

    backendRes.headers.forEach((value, key) => {
        if (key.toLowerCase() === "set-cookie") {
            // append instead of set (VERY IMPORTANT)
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