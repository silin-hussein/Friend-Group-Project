package htl.leonding.bhitm.friendgroup.feature.Note;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import htl.leonding.bhitm.friendgroup.feature.Note.Note;
import htl.leonding.bhitm.friendgroup.feature.Note.NotesRepository;
import io.quarkus.qute.Location;
import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;

import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonValue;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.*;
import java.time.LocalDateTime;
import java.util.LinkedList;
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
