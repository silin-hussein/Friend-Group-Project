package htl.leonding.bhitm.friendgroup.feature.friend;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FriendRepository implements PanacheRepository<Friend> {

}
