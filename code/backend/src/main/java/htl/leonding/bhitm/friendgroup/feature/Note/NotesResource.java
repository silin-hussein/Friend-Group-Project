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
    private static final String NOTES_FILENAME = "notes";
    private long nextNoteID;
    private List<Note> notes;

    @Inject
    NotesRepository notesRepository;

    @GET
    public List<Note> all() {
        return notesRepository.listAll();
    }

    public NotesResource() {
        notes = loadNotes();
        nextNoteID = getNextNoteID();
    }

    /*
     * @GET
     * 
     * @Produces(MediaType.APPLICATION_JSON)
     * public List<Note> get() {
     * return notesRepository.getAllNotes();
     * }
     */

    @Transactional
    @POST
    public Response add(Note note) {
        notesRepository.persist(note);

        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteNote(@PathParam("id") long id) {
        Note note = notesRepository.findById(id);
        if (note == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        notesRepository.delete(note);
        return Response.ok().build();
    }

    @Path("/{id}")
    @GET
    public Note getById(@PathParam("id") Long id) {
        return notesRepository.findById(id);
    }

    /*
     * @DELETE
     * 
     * @Produces(MediaType.APPLICATION_JSON)
     * public List<Note> deleteNote(String value) {
     * try {
     * int id = Integer.parseInt(value.strip());
     * Note noteToDelete = null;
     * for (Note note : notes) {
     * if (note.getID() == id) {
     * noteToDelete = note;
     * break;
     * }
     * }
     * if (noteToDelete != null) {
     * notes.remove(noteToDelete);
     * saveNotes();
     * }
     * } catch (Exception e) {
     * }
     * 
     * return notes;
     * }
     */

    private List<Note> loadNotes() {
        try (FileInputStream fileInputStream = new FileInputStream(NOTES_FILENAME);
                ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream)) {
            notes = (List<Note>) objectInputStream.readObject();
        } catch (IOException | ClassNotFoundException e) {
            notes = new LinkedList<>();
        }
        return notes;
    }

    private long getNextNoteID() {
        long maxID = 0;
        for (Note note : notes) {
            if (note.getID() > maxID) {
                maxID = note.getID();
            }
        }
        return maxID + 1;
    }

    private void saveNotes() {
        try (FileOutputStream fileOutputStream = new FileOutputStream(NOTES_FILENAME);
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream)) {
            objectOutputStream.writeObject(notes);
            objectOutputStream.flush();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
