import { NextResponse } from 'next/server';

/**
 * API route handler for water savings data
 * This route proxies requests to the external API to avoid CORS issues
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ facilityId: string }> }
) {
  try {
    // Await the params before accessing its properties
    const { facilityId } = await params;
    
    if (!facilityId) {
      return NextResponse.json({ error: 'facilityId is required' }, { status: 400 });
    }
    
    const API_URL = `https://apim-scmd-aueast-devtest-kjdn.azure-api.net/dashservice/api/EstimatedWaterSaving/${facilityId}`;
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AUTH_TOKEN || ''}`,
        'Ocp-Apim-Subscription-Key': process.env.API_SUBSCRIPTION_KEY || ''
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorDetail = await response.text().catch(() => 'Unknown error');
      return NextResponse.json(
        { error: `API request failed with status ${response.status}`, detail: errorDetail },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in water savings API route:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}