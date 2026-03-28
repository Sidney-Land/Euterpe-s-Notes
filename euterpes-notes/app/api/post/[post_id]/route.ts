import { NextRequest } from 'next/server';
 
export async function GET(request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
    // Get required post_id
    const post_id = (await params).id;

    // Query Java Database
    const response = await fetch(`https://api.vercel.app/blog/${post_id}`/*, {
        // Optional: forward some headers, add auth tokens, etc.
        //headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    }*/);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    // Transform or forward the response
    const data = await response.json();

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

 
export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  //const { name } = body;
 
  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), body };
 
  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}