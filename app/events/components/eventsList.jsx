import { getAllEvents, getEventImageUrl} from "@/lib/sanity/services/eventService";
import Link from "next/link";
import Image from "next/image";


export default async function EventList() {
    const events = await getAllEvents();

    console.log(events);

    if (events.length === 0) {
        return <p>Wir haben gerade keine Events geplant!</p>;
    }

    return (
        <div className="2xl:bg-accent">
            {events.map((event) => (
                <div className="card bg-base-100 w-96 shadow-sm" key={event._id}>
                    <figure className="px-10 pt-10">
                        <Image
                            src={getEventImageUrl(event.image)}
                            alt="My Image"
                            width={500}
                            height={300}
                            sizes="(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px"
                        />
                    </figure>

                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{event.title}</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions">
                            <Link className="btn btn-primary" href={`/events/${event.slug.current}`}>Zum Event</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}