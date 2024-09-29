import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the import based on your project structure
import { NextRequest } from "next/server";

// If using authentication, import necessary modules
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth'; // Your NextAuth options

export async function POST(request: NextRequest) {
  // Parse the request body
  const body = await request.json();

  // Get the session if using authentication
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  // }

  // Extract data from the request body
  const { title, description, options, organizationId, businessId } = body;

  // Validate input
  if (!title || !options || options.length < 2) {
    return NextResponse.json(
      { message: "Title and at least two options are required" },
      { status: 400 }
    );
  }

  try {
    // Create the poll in the database
    const poll = await prisma.poll.create({
      data: {
        title,
        description,
        organization: {
          connect: { id: organizationId },
        },
        ...(businessId && {
          business: {
            connect: { id: businessId },
          },
        }),
        options: {
          create: options.map((optionText: string, index: number) => ({
            text: optionText,
            order: index + 1,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    // Return the created poll
    return NextResponse.json(poll, { status: 201 });
  } catch (error) {
    console.error("Error creating poll:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        options: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
