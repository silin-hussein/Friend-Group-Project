package htl.leonding.bhitm.friendgroup.feature.Note;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.POST;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@ApplicationScoped
public class NotesRepository implements PanacheRepository<Note> {
    /*
     * public List<Note> getAllNotes() {
     * var ql = "select n from Note n";
     * 
     * var notes = getEntityManager()
     * .createQuery(ql, Note.class)
     * .getResultList();
     * 
     * return notes;
     * }
     */
}
