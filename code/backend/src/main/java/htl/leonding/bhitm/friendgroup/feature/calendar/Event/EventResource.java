package htl.leonding.bhitm.friendgroup.feature.calendar.Event;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/events")
@Produces(MediaType.APPLICATION_JSON)
public class EventResource {
    @Inject
    EventRepository eventRepository;

    @GET
    public List<Event> all() {
        return eventRepository.listAll();
    }

    @Path("/{id}")
    @GET
    public Event getById(@PathParam("id") Long id) {
        return eventRepository.findById(id);
    }

    @Transactional
    @POST
    public Response add(Event event) {
        eventRepository.persist(event);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") long id) {
        Event event = eventRepository.findById(id);

        if (event == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        eventRepository.delete(event);
        return Response.ok().build();
    }
}
