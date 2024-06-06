package htl.leonding.bhitm.friendgroup.feature.friend;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/friends")
@Produces(MediaType.APPLICATION_JSON)
public class FriendResource {
    @Inject
    FriendRepository friendRepository;

    @Inject
    FriendMapper friendMapper;

    @GET
    public List<FriendDto> all() {
        return friendRepository
                .listAll()
                .stream()
                .map(friendMapper::toResource)
                .toList();
    }

    @Path("/{id}")
    @GET
    public Friend getById(@PathParam("id") Long id) {
        return friendRepository.findById(id);
    }

    @Transactional
    @POST
    public Response add(Friend friend) {
        friendRepository.persist(friend);

        return Response.ok().build();
    }
}