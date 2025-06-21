

import {client} from "@/lib/sanity/client";
import {getAllEvents} from "@/lib/sanity/services/eventService";
import EventList from "@/app/events/components/eventsList";

export default async function IndexPage() {
    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8">
            <h1 className="text-4xl font-bold mb-8">EVENTS</h1>
            <ul className="flex flex-col gap-y-4">
                <EventList />
            </ul>
        </main>
    );
}