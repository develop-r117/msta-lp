import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 静的ファイルやNext.jsの内部パスはスキップ
  const pathname = request.nextUrl.pathname;
  
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  // 認証ヘッダーがない場合
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // Base64デコード
  const base64Credentials = authHeader.substring(6); // "Basic " を除去
  
  let credentials: string;
  try {
    // Edge Runtimeではatobが利用可能
    credentials = atob(base64Credentials);
  } catch (error) {
    return new NextResponse("Invalid authorization format", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const parts = credentials.split(":");
  if (parts.length !== 2) {
    return new NextResponse("Invalid credentials format", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const [username, password] = parts;

  // 認証情報の検証
  if (username === "r117" && password === "r1172025") {
    return NextResponse.next();
  }

  return new NextResponse("Invalid credentials", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
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
