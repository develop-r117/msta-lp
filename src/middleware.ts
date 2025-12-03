import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 本番環境のみBASIC認証を適用（オプション）
  // 開発環境で認証をスキップしたい場合は、以下のコメントを外してください
  // if (process.env.NODE_ENV === "development") {
  //   return NextResponse.next();
  // }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  // Base64デコードしてユーザー名とパスワードを取得
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  // 認証情報の検証
  const validUsername = process.env.BASIC_AUTH_USER || "r117";
  const validPassword = process.env.BASIC_AUTH_PASSWORD || "r1172025";

  if (username === validUsername && password === validPassword) {
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
     * - 公開リソース（オプション）
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

