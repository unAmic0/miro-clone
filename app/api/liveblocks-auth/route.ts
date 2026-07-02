import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const requestSchema = z.object({
  room: z.string(),
});

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// TODO: check, maybe theres reason to fix the types
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  const parsed = requestSchema.safeParse(await req.json());
  if (!parsed.success)
    return new NextResponse("Invalid reques body", { status: 400 });

  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user)
    return new NextResponse("Unauthorized", { status: 401 });
  if (!user.primaryEmailAddress)
    return new NextResponse("Email address is missing", { status: 422 });

  const room = parsed.data.room as Id<"boards">;
  const board = await convex.query(api.board.get, { id: room });

  if (authorization.orgId !== board?.orgId)
    return new NextResponse("Unauthorized", { status: 401 });

  const userInfo = {
    // biome-ignore lint/style/noNonNullAssertion: the if condition above (near 30th line)
    name: (user.username || user.primaryEmailAddress.emailAddress)!,
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });

  session.allow(room, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new NextResponse(body, { status });
}
