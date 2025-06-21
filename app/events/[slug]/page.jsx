import Link from "next/link";
import { PortableText } from "next-sanity";
import { getEventBySlug, getEventImageUrl } from "@/lib/sanity/services/eventService";
import Image from "next/image";

export const revalidate = 60; // ISR every minute

export default async function EventPage({ params }) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);
    const eventImageUrl = getEventImageUrl(event.image);

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
            <Link href="/events" className="hover:underline">
                ← Back to Events
            </Link>

            {eventImageUrl && (
                <Image
                    priority={true}
                    src={eventImageUrl}
                    alt={event.title}
                    className="aspect-video rounded-xl"
                    width="550"
                    height="310"
                />
            )}

            <h1 className="text-4xl font-bold mb-8">{event.title}</h1>
            <div className="prose">
                <p>Published: {new Date(event.startDateTime).toLocaleDateString()}</p>
                {Array.isArray(event.body) && <PortableText value={event.body} />}
            </div>
        </main>
    );
}
