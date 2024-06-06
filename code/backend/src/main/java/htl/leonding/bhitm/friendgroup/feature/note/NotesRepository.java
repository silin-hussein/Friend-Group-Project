package htl.leonding.bhitm.friendgroup.feature.note;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class NotesRepository implements PanacheRepository<Note> {

}
