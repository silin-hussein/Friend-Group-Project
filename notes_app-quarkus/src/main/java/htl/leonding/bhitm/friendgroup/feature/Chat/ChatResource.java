package htl.leonding.bhitm.friendgroup.feature.Chat;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/chats")
@Produces(MediaType.APPLICATION_JSON)
public class ChatResource {
    @Inject
    ChatRepository chatRepository;

    @GET
    public List<Chat> all() {
        return chatRepository.listAll();
    }

    @Path("/{id}")
    @GET
    public Chat getById(@PathParam("id") Long id) {
        return chatRepository.findById(id);
    }

    @Transactional
    @POST
    public Response add(Chat chat) {
        chatRepository.persist(chat);

        return Response.ok().build();
    }
}