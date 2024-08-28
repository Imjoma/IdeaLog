import Idea from "@/models/Idea";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const ideas = await Idea.find().sort({ createdAt: -1 });
    return NextResponse.json(ideas, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Database Error" }, { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newIdea = new Idea(body);

  try {
    await connect();

    const ideaItem = await newIdea.save();

    return NextResponse.json(ideaItem, { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
