import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Base64デコード関数（Edge Runtime対応）
function decodeBase64(str: string): string {
  // Edge Runtime（Cloudflare Workers）ではatobが利用可能
  if (typeof atob !== "undefined") {
    return atob(str);
  }
  // フォールバック: Node.js環境の場合
  throw new Error("Base64 decoder (atob) not available in this environment");
}

export function middleware(request: NextRequest) {
  try {
    // 静的ファイルやNext.jsの内部ファイルはスキップ
    const pathname = request.nextUrl.pathname;
    
    if (
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/api/") ||
      pathname === "/favicon.ico"
    ) {
      return NextResponse.next();
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
          "Content-Type": "text/plain",
        },
      });
    }

    // Base64デコード
    const base64Credentials = authHeader.substring(6); // "Basic " を除去
    if (!base64Credentials) {
      return new NextResponse("Invalid authorization header", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
          "Content-Type": "text/plain",
        },
      });
    }

    let credentials: string;
    try {
      credentials = decodeBase64(base64Credentials);
    } catch {
      return new NextResponse("Failed to decode credentials", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
          "Content-Type": "text/plain",
        },
      });
    }

    const [username, password] = credentials.split(":");

    if (!username || !password) {
      return new NextResponse("Invalid credentials format", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
          "Content-Type": "text/plain",
        },
      });
    }

    // 認証情報の検証
    const validUsername = "r117";
    const validPassword = "r1172025";

    if (username === validUsername && password === validPassword) {
      return NextResponse.next();
    }

    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    // エラーログを出力（Cloudflare Pagesのログに記録される）
    console.error("Middleware error:", error);
    
    // エラーが発生した場合は認証をスキップ（オプション）
    // 本番環境ではエラーを返す方が安全
    return new NextResponse("Authentication error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * すべてのリクエストパスにマッチしますが、以下を除外:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
