package htl.leonding.bhitm.friendgroup.feature.friend;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FriendMapper {
    public FriendDto toResource(Friend friend){
        return new FriendDto(
                friend.getId(),
                friend.getUsername(),
                friend.getFirstName(),
                friend.getLastName(),
                friend.getDescription()
        );
    }
}
