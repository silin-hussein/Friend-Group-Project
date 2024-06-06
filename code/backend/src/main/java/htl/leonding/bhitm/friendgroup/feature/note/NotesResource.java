package htl.leonding.bhitm.friendgroup.feature.note;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

import static java.util.Objects.requireNonNull;

@Path("/notes")
@Produces(MediaType.APPLICATION_JSON)
public class NotesResource {
    @Inject
    NotesRepository notesRepository;

    @GET
    public List<Note> all() {
        return notesRepository.listAll();
    }

    @Path("/{id}")
    @GET
    public Note getById(@PathParam("id") Long id) {
        return notesRepository.findById(id);
    }

    @Transactional
    @POST
    public Response add(Note note) {
        notesRepository.persist(note);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") long id) {
        Note note = notesRepository.findById(id);

        if (note == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        notesRepository.delete(note);
        return Response.ok().build();
    }
}
