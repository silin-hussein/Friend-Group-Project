package htl.leonding.bhitm.friendgroup.feature.chat;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ChatRepository implements PanacheRepository<Chat> {

}