package htl.leonding.bhitm.friendgroup.feature.Chat.Message;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/messages")
@Produces(MediaType.APPLICATION_JSON)
public class MessageResource {
    @Inject
    MessageRepository messageRepository;

    @GET
    public List<Message> all() {
        return messageRepository.listAll();
    }

    @Path("/{id}")
    @GET
    public Message getById(@PathParam("id") Long id) {
        return messageRepository.findById(id);
    }
}