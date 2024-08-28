import Idea from "@/models/Idea";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const ideas = await Idea.find({ visibility: "Public" }).sort({
      createdAt: -1,
    });
    return new NextResponse(JSON.stringify(ideas), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
